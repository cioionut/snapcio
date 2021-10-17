import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import io from 'socket.io-client';

import { StreamContext } from './StreamContext';
// import { SocketContext } from './SocketContext';


const { RTCPeerConnection, RTCSessionDescription } = window;
const peerConnection = new RTCPeerConnection();

export const MyAppContext = createContext({
  peerConnection: null,
  callUser: (socketId) => {},
  connectedUsers: [],
  localStream: null,
  remoteStream: null
});

// import useSocket from '../hooks/useSocket';

function useSocket(url) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;

    // should only run once and not on every re-render,
    // so pass an empty array
  }, [])

  return socket
}

export const MyAppContextProvider = ({ children }) => {

  const [ localStream, setLocalStream ] = useState(null);
  const [ remoteStream, setRemoteStream ] = useState(null);

  const [ connectedUsers, setConnectedUsers ] = useState([]);
  const [ getCalled, setGetCalled ] = useState(false);
  const [ isAlreadyCalling, setIsAlreadyCalling ] = useState(false);

  const { startMediaStream } = useContext(StreamContext);
  // const { socket } = useContext(SocketContext);
  const socket = useSocket('http://localhost:5000');

  // add local stream tracks to peerConnection
  useEffect(() => {
    startMediaStream()
      .then((stream) => {
        console.log('set tracks');
        setLocalStream(stream);
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
      })
      .catch((error) => {
        console.log('Failed to get local stream', error);
      });
  }, []);

  // handle sockets
  useEffect(() => {
    if (!socket) return;

      // functions
    const updateUserList = ({ users }) => {
      console.log(`updateUserList::ids: ${users}`);
      // todo: find a better way to update the list
      setConnectedUsers(users);
    }
    const removeUser = ({ socketId }) => {
      console.log(`removeUser::ids: ${socketId}`);
      // todo: find a better way to update the list
      setConnectedUsers(connectedUsers.filter(usrSocketId => usrSocketId != socketId));
    }

    const callReceived = async data => {
      console.log(`getCalled::${getCalled}`)
      if (getCalled) {
        const confirmed = confirm(
          `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
        );
        if (!confirmed) {
          socket.emit("reject-call", {
            from: data.socket
          });
          return;
        }
      }
      // sdp
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
    
      socket.emit("make-answer", {
        answer,
        to: data.socket
      });
      setGetCalled(true);
    }

    const answerToCall = async data => {
      console.log(`receive-answer::`, data.answer);

      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    
      if (!isAlreadyCalling) {
        callUser(data.socket);
        setIsAlreadyCalling(true);
      }
    }

    const rejectCall = data => {
      alert(`User: "Socket: ${data.socket}" rejected your call.`);
      // unselectUsersFromList();
    }

    socket.on("update-user-list", updateUserList);
    socket.on("remove-user", removeUser);
    socket.on("call-made", callReceived);
    socket.on("answer-made", answerToCall);
    socket.on("call-rejected", rejectCall);

    return () => {
      socket.off("update-user-list", updateUserList);
      socket.off("remove-user", removeUser);
      socket.off("call-made", callReceived);
      socket.off("answer-made", answerToCall);
      socket.off("call-rejected", rejectCall);
    }

  }, [socket, callUser, connectedUsers, getCalled, isAlreadyCalling]);
  
  // set remote stream
  peerConnection.ontrack = function({ streams: [stream] }) {
    console.log("set-remote-stream", stream);
    setRemoteStream(stream);
  };

  // functions
  const callUser = useCallback(async (socketId) => {
    console.log(`callUser:: ${socketId}`);
    
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
  
    socket.emit("call-user", {
      offer,
      to: socketId
    });

  }, [socket]);

  return (
    <MyAppContext.Provider value={{
      peerConnection,
      callUser,
      connectedUsers,
      localStream,
      remoteStream
    }}>
      {children}
    </MyAppContext.Provider>
  )

}