import * as React from 'react';

import { PeerContext } from '../contexts/PeerContext';


export default function Call({ localStream, otherVideo }) {

  const [messages, setMessages] = React.useState([]);
  // const [localStream, setLocalStream] = React.useState(null);
  // const [getUserMedia, setGetUserMedia] = React.useState(null);
  const {peer, connection, setConnection} = React.useContext(PeerContext);


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
    if (connection && peer && otherVideo && localStream) {
      let dispose = () => {};
      const handler = (call) => {
        call.answer(localStream)
        dispose = showStream(call, otherVideo.current);
        connection.on('close', () => closeVideo(otherVideo.current))
      };
      if (connection['caller'] === peer.id) {
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
    closeVideo(otherVideo.current);
  }, [connection]);


  function closeVideo(video: HTMLVideoElement) {
    video.srcObject = null;
  }

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
        <div>
          {messages.map((msg) => (
            <p key={msg.id} style={{ color: msg.self ? '#999' : '#222' }}>
              <b>{msg.user}</b> ({msg.time}): {msg.message}
            </p>
          ))}
        </div>
        <div>
          <form onSubmit={submit}>
            <input name="message" autoComplete="off" />
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
