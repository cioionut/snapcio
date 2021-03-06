
import { useContext, useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// locals
// import { WebRTCContextProvider, WebRTCContext } from '../contexts/WebRTCContext';

// import UserList from './list/users';

const pcConfig = {
  'iceServers': [
    {
      'urls': `stun:${process.env.NEXT_PUBLIC_TURN_HOST}`
    },
    {
      'urls': `turn:${process.env.NEXT_PUBLIC_TURN_HOST}`,
      'username': process.env.NEXT_PUBLIC_TURN_USER,
      'credential': process.env.NEXT_PUBLIC_TURN_PASSWORD,
    }
  ]
};


function useSocket() {
  const [socket, setSocket] = useState(null);
  const [ url, setUrl ] = useState(process.env.NEXT_PUBLIC_ENV === 'production' ? process.env.NEXT_PUBLIC_SIGNALING_API_URL : 'http://localhost:5000');

  useEffect(() => {
    const socketIo = io(url);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;

    // should only run once and not on every re-render,
    // so pass an empty array
  }, [url])

  return socket
}

// Output logging information to console.
function log(text) {
  const time = new Date();
  console.log("[" + time.toLocaleTimeString() + "] " + text);
}
// Output an error message to console.
function log_error(text) {
  const time = new Date();
  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}

// Handles reporting errors. Currently, we just dump stuff to console but
// in a real-world application, an appropriate (and user-friendly)
// error message should be displayed.
function reportError(errMessage) {
  log_error(`Error ${errMessage.name}: ${errMessage.message}`);
}

function showVideo(stream: MediaStream, video: HTMLVideoElement, muted: boolean) {
  // console.log("Should play stream", video);
  video.srcObject = stream;
  video.volume = muted ? 0 : 1;
  video.onloadedmetadata = () => video.play();
}

const mediaConstraints = {
  audio: true,            // We want an audio track
  video: {
    aspectRatio: {
      ideal: 1.333333     // 3:2 aspect is preferred
    }
  }
};

export default function ChatMain() {
  return (
    <>
      <Chat/>
    </>
  )
};


function Chat() {
  const selfVideo = useRef(null);
  const otherVideo = useRef(null);

  const [ localStream, setLocalStream ] = useState(null);
  const [ remoteStream, setRemoteStream ] = useState(null);

  const [ availableUsers, setAvailableUsers ] = useState([]);

  const socket = useSocket();

  const [ myUsername, setMyUsername ] = useState(null);      // To store my username
  const [ targetUsername, setTargetUsername ] = useState(null);      // To store username of other peer
  const [ myPeerConnection, setMyPeerConnection ] = useState(null);    // RTCPeerConnection
  const [ transceiver, setTransceiver ] = useState([null]);    // RTCRtpTransceiver

  // Send a JavaScript object by converting it to JSON and sending
  // it as a message on the WebSocket connection.
  const sendToServer = useCallback(function (msg) {
    log("Sending '" + msg.type + "' message: " + msg);
    socket.emit(msg.type, msg);
  }, [socket]);

  // Close the RTCPeerConnection and reset variables so that the user can
  // make or receive another call if they wish. This is called both
  // when the user hangs up, the other user hangs up, or if a connection
  // failure is detected.
  const closeVideoCall = useCallback(function () {
    log("Closing the call");

    // Close the RTCPeerConnection
    if (myPeerConnection) {
      log("--> Closing the peer connection");

      // Disconnect all our event listeners; we don't want stray events
      // to interfere with the hangup while it's ongoing.
      myPeerConnection.ontrack = null;
      myPeerConnection.onnicecandidate = null;
      myPeerConnection.oniceconnectionstatechange = null;
      myPeerConnection.onsignalingstatechange = null;
      myPeerConnection.onicegatheringstatechange = null;
      myPeerConnection.onnotificationneeded = null;

      // Stop all transceivers on the connection
      myPeerConnection.getTransceivers().forEach(transceiver => {
        transceiver.stop();
      });

      // Stop the webcam preview as well by pausing the <video>
      // element, then stopping each of the getUserMedia() tracks
      // on it.
      // if (localVideo.srcObject) {
      //   localVideo.pause();
      //   localVideo.srcObject.getTracks().forEach(track => {
      //     track.stop();
      //   });
      // }

      // Close the peer connection
      myPeerConnection.close();
      setMyPeerConnection(null);
      // setLocalStream(null);
    }

    // Disable the hangup button
    setTargetUsername(null);
  }, [myPeerConnection]);

  // Hang up the call by closing our end of the connection, then
  // sending a "hang-up" message to the other peer (keep in mind that
  // the signaling is done on a different connection). This notifies
  // the other peer that the connection should be terminated and the UI
  // returned to the "no call in progress" state.
  const hangUpCall = useCallback(() => {
    closeVideoCall();
    sendToServer({
      name: myUsername,
      target: targetUsername,
      type: "hang-up"
    });
    setTargetUsername(null);
  }, [closeVideoCall, sendToServer, myUsername, targetUsername])

  // Handle errors which occur when trying to access the local media
  // hardware; that is, exceptions thrown by getUserMedia(). The two most
  // likely scenarios are that the user has no camera and/or microphone
  // or that they declined to share their equipment when prompted. If
  // they simply opted not to share their media, that's not really an
  // error, so we won't present a message in that situation.
  const handleGetUserMediaError = useCallback(function (e) {
    log_error(e);
    switch(e.name) {
      case "NotFoundError":
        alert("Unable to open your call because no camera and/or microphone" +
              "were found.");
        break;
      case "SecurityError":
      case "PermissionDeniedError":
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        alert("Error opening your camera and/or microphone: " + e.message);
        break;
    }

    // Make sure we shut down our end of the RTCPeerConnection so we're
    // ready to try again.
    closeVideoCall();
  }, [closeVideoCall]);

  // Handles |icecandidate| events by forwarding the specified
  // ICE candidate (created by our local ICE agent) to the other
  // peer through the signaling server.
  const handleICECandidateEvent = useCallback(function (event) {
    if (event.candidate) {
      log("*** Outgoing ICE candidate: " + event.candidate.candidate);
      sendToServer({
        type: "new-ice-candidate",
        target: targetUsername,
        candidate: event.candidate
      });
    }
  }, [sendToServer, targetUsername]);

  // Handle |iceconnectionstatechange| events. This will detect
  // when the ICE connection is closed, failed, or disconnected.
  //
  // This is called when the state of the ICE agent changes.
  const handleICEConnectionStateChangeEvent = useCallback(function (event) {
    log("*** ICE connection state changed to " + myPeerConnection.iceConnectionState);
    switch(myPeerConnection.iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        closeVideoCall();
        break;
    }
  }, [myPeerConnection, closeVideoCall]);

  // Handle the |icegatheringstatechange| event. This lets us know what the
  // ICE engine is currently working on: "new" means no networking has happened
  // yet, "gathering" means the ICE engine is currently gathering candidates,
  // and "complete" means gathering is complete. Note that the engine can
  // alternate between "gathering" and "complete" repeatedly as needs and
  // circumstances change.
  //
  // We don't need to do anything when this happens, but we log it to the
  // console so you can see what's going on when playing with the sample.
  const handleICEGatheringStateChangeEvent = useCallback(function (event) {
    log("*** ICE gathering state changed to: " + myPeerConnection.iceGatheringState);
  }, [myPeerConnection]); // do nothing

  // Set up a |signalingstatechange| event handler. This will detect when
  // the signaling connection is closed.
  //
  // NOTE: This will actually move to the new RTCPeerConnectionState enum
  // returned in the property RTCPeerConnection.connectionState when
  // browsers catch up with the latest version of the specification!
  const handleSignalingStateChangeEvent = useCallback(function (event) {
    log("*** WebRTC signaling state changed to: " + myPeerConnection.signalingState);
    switch(myPeerConnection.signalingState) {
      case "closed":
        closeVideoCall();
        break;
    }
  }, [myPeerConnection, closeVideoCall]); // depends on closeVideoCall


  // Called by the WebRTC layer to let us know when it's time to
  // begin, resume, or restart ICE negotiation.
  const handleNegotiationNeededEvent = useCallback(async function () {
    log("*** Negotiation needed");
    try {
      log("---> Creating offer");
      const offer = await myPeerConnection.createOffer();

      // If the connection hasn't yet achieved the "stable" state,
      // return to the caller. Another negotiationneeded event
      // will be fired when the state stabilizes.
      if (myPeerConnection.signalingState != "stable") {
        log("     -- The connection isn't stable yet; postponing...")
        return;
      }

      // Establish the offer as the local peer's current description.
      log("---> Setting local description to the offer");
      await myPeerConnection.setLocalDescription(offer);

      // Send the offer to the remote peer.
      log("---> Sending the offer to the remote peer");
      sendToServer({
        name: myUsername,
        target: targetUsername,
        type: "video-offer",
        sdp: myPeerConnection.localDescription
      });
    } catch(err) {
      log("*** The following error occurred while handling the negotiationneeded event:");
      reportError(err);
    };
  }, [myPeerConnection, myUsername, targetUsername, sendToServer]); // depends on socketio and needs myusername and targetusername

  // Called by the WebRTC layer when events occur on the media tracks
  // on our WebRTC call. This includes when streams are added to and
  // removed from the call.
  //
  // track events include the following fields:
  //
  // RTCRtpReceiver       receiver
  // MediaStreamTrack     track
  // MediaStream[]        streams
  // RTCRtpTransceiver    transceiver
  //
  // In our case, we're just taking the first stream found and attaching
  // it to the <video> element for incoming media.
  const handleTrackEvent = useCallback(function (event) {
    log("*** Track event: show remote stream");
    // document.getElementById("received_video").srcObject = event.streams[0];
    showVideo(event.streams[0], otherVideo.current, false);
  }, [otherVideo]); // depends on received video html element

  // Create the RTCPeerConnection which knows how to talk to our
  // selected STUN/TURN server and then uses getUserMedia() to find
  // our camera and microphone and add that stream to the connection for
  // use in our video call. Then we configure event handlers to get
  // needed notifications on the call.
  const createPeerConnection = useCallback(async function () {
    log("Setting up a connection...");

    // Create an RTCPeerConnection which knows to use our chosen
    // STUN server.
    const pc = new RTCPeerConnection(pcConfig);
    setMyPeerConnection(pc);
    return pc;
  }, []);

  // Set up event handlers for the ICE negotiation process.
  useEffect(()=> {
    if (!myPeerConnection) return;
    // Set up event handlers for the ICE negotiation process.
    myPeerConnection.onicecandidate = handleICECandidateEvent;
    myPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    myPeerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
    myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
    myPeerConnection.ontrack = handleTrackEvent;
  }, [myPeerConnection, handleICECandidateEvent, handleICEConnectionStateChangeEvent, handleICEGatheringStateChangeEvent, handleSignalingStateChangeEvent, handleNegotiationNeededEvent, handleTrackEvent]);

  // Handle a click on an item in the user list by inviting the clicked
  // user to video chat. Note that we don't actually send a message to
  // the callee here -- calling RTCPeerConnection.addTrack() issues
  // a |notificationneeded| event, so we'll let our handler for that
  // make the offer.
  const invite = useCallback(async function (userId) {
    log("Starting to prepare an invitation");
    if (myPeerConnection) {
      alert("You can't start a call because you already have one open!");
    } else {
      const clickedUsername = userId;

      // Don't allow users to call themselves, because weird.
      if (clickedUsername === myUsername) {
        alert("I'm afraid I can't let you talk to yourself. That would be weird.");
        return;
      }

      // Record the username being called for future reference
      setTargetUsername(clickedUsername);
      log("Inviting user " + clickedUsername);

      // Call createPeerConnection() to create the RTCPeerConnection.
      // When this returns, myPeerConnection is our RTCPeerConnection
      // and webcamStream is a stream coming from the camera. They are
      // not linked together in any way yet.
      log("Setting up connection to invite user: " + clickedUsername);
      const mpc = await createPeerConnection();

      // Get access to the webcam stream and attach it to the
      // "preview" box (id "local_video").
      try {
        const webcamStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        // Add the camera stream to the RTCPeerConnection
        webcamStream.getTracks().forEach(
          track => mpc.addTransceiver(track, {streams: [webcamStream]})
        );
        // show media stream
        showVideo(webcamStream, selfVideo.current, true);
        // set for future refs
        setLocalStream(webcamStream);

      } catch(err) {
        handleGetUserMediaError(err);
        return;
      }
    }
  }, [myPeerConnection, myUsername, createPeerConnection, handleGetUserMediaError]);


  useEffect(() => {
    if (!socket) return;
    
    // handle received events from server
    
    // Accept an offer to video chat. We configure our local settings,
    // create our RTCPeerConnection, get and attach our local camera
    // stream, then create and send an answer to the caller.
    async function handleVideoOfferMsg(msg) {
      const targetUser = msg.name;
      // set for furure reference
      setTargetUsername(targetUser);
      let mpc = myPeerConnection;

      // If we're not already connected, create an RTCPeerConnection
      // to be linked to the caller.
      log("Received video chat offer from " + targetUser);
      if (!myPeerConnection) {
        mpc = await createPeerConnection();
      }

      // We need to set the remote description to the received SDP offer
      // so that our local WebRTC layer knows how to talk to the caller.
      var desc = new RTCSessionDescription(msg.sdp);

      // If the connection isn't stable yet, wait for it...
      if (mpc.signalingState != "stable") {
        log("  - But the signaling state isn't stable, so triggering rollback");

        // Set the local and remove descriptions for rollback; don't proceed
        // until both return.
        await Promise.all([
          mpc.setLocalDescription({type: "rollback"}),
          mpc.setRemoteDescription(desc)
        ]);
        return;
      } else {
        log ("  - Setting remote description");
        await mpc.setRemoteDescription(desc);
      }

      // Get the webcam stream if we don't already have it
      if (!localStream) {
        try {
          const webcamStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
          // Add the camera stream to the RTCPeerConnection
          webcamStream.getTracks().forEach(
            track => mpc.addTransceiver(track, {streams: [webcamStream]})
          );
          // show media stream
          showVideo(webcamStream, selfVideo.current, true);
          // set for future refs
          setLocalStream(webcamStream);

        } catch(err) {
          handleGetUserMediaError(err);
          return;
        }
      }

      // console.log('handleVideoOfferMsg::', mpc.getTransceivers());
      if (mpc.getTransceivers().length <= 2) {
        // Just Add the camera stream to the RTCPeerConnection
        localStream.getTracks().forEach(
          track => mpc.addTransceiver(track, {streams: [localStream]})
        );
      }

      log("---> Creating and sending answer to caller");
      await mpc.setLocalDescription(await mpc.createAnswer());

      sendToServer({
        name: myUsername,
        target: targetUser,
        type: "video-answer",
        sdp: mpc.localDescription
      });
    } // depends on local_video html element, webcamStream

    // Responds to the "video-answer" message sent to the caller
    // once the callee has decided to accept our request to talk.
    async function handleVideoAnswerMsg(msg) {
      log("*** Call recipient has accepted our call");

      // Configure the remote description, which is the SDP payload
      // in our "video-answer" message.
      var desc = new RTCSessionDescription(msg.sdp);
      await myPeerConnection.setRemoteDescription(desc).catch(reportError);
    }

    // A new ICE candidate has been received from the other peer. Call
    // RTCPeerConnection.addIceCandidate() to send it along to the
    // local ICE framework.
    async function handleNewICECandidateMsg(msg) {
      const candidate = new RTCIceCandidate(msg.candidate);

      log("*** Adding received ICE candidate: " + JSON.stringify(candidate));

      try {
        await myPeerConnection.addIceCandidate(candidate)
      } catch(err) {
        reportError(err);
      }
    }

    // Handle the "hang-up" message, which is sent if the other peer
    // has hung up the call or otherwise disconnected.
    function handleHangUpMsg(msg) {
      log("*** Received hang up notification from other peer");
      closeVideoCall();
    } // depends on closeVideoCall

    // user mnagement functions
    const updateUserList = ({ users }) => {
      console.log(`updateUserList::ids: ${users}`);
      // todo: find a better way to update the list
      setAvailableUsers(users.filter(usr=> usr != socket.id));
    }
    const removeUser = ({ socketId }) => {
      console.log(`removeUser::ids: ${socketId}`);
      // todo: find a better way to update the list
      setAvailableUsers(availableUsers.filter(usrSocketId => usrSocketId != socketId));
    };

    const inviteToCall = ({ target }) => {
      if (target) {
        invite(target);
      } else {
        alert('No other users available');
      }
    }

    socket.on('connect', function() {
      setMyUsername(socket.id); // 
    });

    socket.on("update-user-list", updateUserList);
    socket.on("remove-user", removeUser);

    socket.on('receive-a-match', inviteToCall);

    // Signaling messages: these messages are used to trade WebRTC
    // signaling information during negotiations leading up to a video
    // call.
    socket.on('video-offer', handleVideoOfferMsg);  // Invitation and offer to chat
    socket.on('video-answer', handleVideoAnswerMsg); // Callee has answered our offer
    socket.on('new-ice-candidate', handleNewICECandidateMsg); // A new ICE candidate has been received
    socket.on('hang-up', handleHangUpMsg); // The other peer has hung up the call

    return () => {
      socket.off("update-user-list", updateUserList);
      socket.off("remove-user", removeUser);
      socket.off('receive-a-match', inviteToCall);

      socket.off('video-offer', handleVideoOfferMsg);
      socket.off('video-answer', handleVideoAnswerMsg);
      socket.off('new-ice-candidate', handleNewICECandidateMsg);
      socket.off('hang-up', handleHangUpMsg);
    }
  }, [socket, myPeerConnection, createPeerConnection, myUsername, targetUsername, localStream, availableUsers, sendToServer, closeVideoCall, handleGetUserMediaError, invite]);


  const nextUser = useCallback(() => {
    if (targetUsername)
      hangUpCall();
    socket.emit('request-a-match', {
      name: myUsername,
    });
  }, [socket, myUsername, targetUsername, hangUpCall]);

  return (
    <>
      <Container>
        <Box>
          <video className={'brokenvideo'} ref={otherVideo}/>
        </Box>
        <Box>
          <video className={`video-hflip ${localStream  ? '' : 'brokenvideo'}`} ref={selfVideo}/>
        </Box>
        <Box>
          <Button variant="contained" onClick={ nextUser }>Skip</Button>
        </Box>
        <Box>
          Available Users: {availableUsers.length}
        </Box>
      </Container>

      <style jsx>{`
        video {
          max-width: 100%;
          height: auto;
        }
        .video-hflip {
            transform: rotateY(180deg);
            -webkit-transform:rotateY(180deg); /* Safari and Chrome */
            -moz-transform:rotateY(180deg); /* Firefox */
        }
        .container {
          display: flex;
        }
        .container__half {
          flex: 1;
          justify-content: center;
        }
        .brokenvideo {
          background-image: url("/broken_stream.gif");
          background-repeat: no-repeat;

          background-color: #cccccc; /* Used if the image is unavailable */
          
          margin-bottom: 15px;
        }
        .button {
          background-color: blue;
          border: none;
          border-radius: 5px;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          font-weight: 600;
          transition-duration: 0.4s;
          cursor: pointer;
        }
        .button:hover {
          background-color: #4CAF50; /* Green */
          color: white;
        }
        
      `}</style>
    </>
  )
};