import * as React from 'react';

// import PeerJs from 'peerjs';

import { PeerContext } from '../contexts/PeerContext';
import { StreamContext } from '../contexts/StreamContext';


export default function Call() {

  const otherVideo = React.useRef();
  const selfVideo = React.useRef();
  const [messages, setMessages] = React.useState([]);
  const [localStream, setLocalStream] = React.useState();
  // const [getUserMedia, setGetUserMedia] = React.useState(null);
  const {peer, connection, setConnection} = React.useContext(PeerContext);
  const {
    startMediaStream,
  } = React.useContext(StreamContext)

  const appendMessage = React.useCallback(
    (message: string, self: boolean) =>
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now(),
          message,
          self,
          time: new Date().toLocaleTimeString(),
          user: self ? peer.id : connection.peer,
        },
      ]),
    [],
  );

  React.useEffect(() => {
    if (selfVideo)
    startMediaStream()
      .then((stream) => {
          showVideo(stream, selfVideo.current, true);
          setLocalStream(stream);
      })
      .catch((error) => {
          console.log('Failed to get local stream', error);
      });
  }, []);

  React.useEffect(() => {
    if (connection && peer && otherVideo && localStream) {
      let dispose = () => {};
      const handler = (call) => {
        call.answer(localStream)
        dispose = showStream(call, otherVideo.current);
      };
      if (connection['caller'] === peer.id) {

        // console.log('make call')
        const call = peer.call(connection.peer, localStream);
        dispose = showStream(call, otherVideo.current);
      } else {
        peer.on('call', handler);
      }
      return () => {
        peer.off('call', handler);
        dispose();
      };
    }
  }, [connection, peer, otherVideo, localStream]);

  React.useEffect(() => {
    if (!connection) {
      console.log("Not connection")
      // router.push('/chat');
    } else {
      const dataHandler = (message: string) => {
        appendMessage(message, false);
      };
      const closeHandler = () => {
        setConnection(undefined);
      };
      connection.on('data', dataHandler);
      connection.on('close', closeHandler);
      return () => {
        connection.off('data', dataHandler);
        connection.off('close', closeHandler);
      };
    }
  }, [connection]);

  const submit = React.useCallback(
    (ev) => {
      const input = ev.currentTarget.elements.namedItem('message') as HTMLInputElement;
      const message = input.value;
      ev.preventDefault();
      connection.send(message);
      appendMessage(message, true);
      input.value = '';
    },
    [connection],
  );

  const disconnect = React.useCallback(() => {
    connection.close();
    setConnection(undefined);
  }, [connection]);


  function showVideo(stream: MediaStream, video: HTMLVideoElement, muted: boolean) {
    // console.log("Should play stream", video);
    video.srcObject = stream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();
  }
  
  function showStream(call, otherVideo: HTMLVideoElement) {
    const handler = (remoteStream: MediaStream) => {
      // console.log("Remote stream: ", remoteStream)
      showVideo(remoteStream, otherVideo, false);
    };
    call.on('stream', handler);
  
    return () => call.off('stream', handler);
  }

  return (
    <>
      <div className="container">
        <h1>
          {peer?.id} ⬄ {connection?.peer} <button onClick={disconnect}>Hang up</button>
        </h1>
        <video ref={otherVideo} width={500} height={500} />
        <video ref={selfVideo} width={200} height={200} />
        <div>
          {messages.map((msg) => (
            <p key={msg.id} style={{ color: msg.self ? '#999' : '#222' }}>
              <b>{msg.user}</b> ({msg.time}): {msg.message}
            </p>
          ))}
        </div>
        <div>
          <form onSubmit={submit}>
            <input name="message" />
            <button>Send</button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-bottom: 50px;
        }
      `}</style>
    </>
  );
};
