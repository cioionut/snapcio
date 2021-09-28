import * as React from 'react';

import { PeerContext } from '../contexts/PeerContext';


export default function Call({ localStream, otherVideo }) {

  const [messages, setMessages] = React.useState([]);
  const [mediaConnection, setMediaConnection] = React.useState(null);

  const {peer, dataConnection, setDataConnection} = React.useContext(PeerContext);

  const appendMessage = React.useCallback(
    (message: string, self: boolean) =>
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now(),
          message,
          self,
          time: new Date().toLocaleTimeString(),
          user: self ? peer.id : dataConnection.peer,
        },
      ]),
    [],
  );

  React.useEffect(() => {
    if (dataConnection && peer && otherVideo && localStream) {
      let dispose = () => {};
      const handler = (mediaConn) => {
        mediaConn.answer(localStream);
        dispose = showStream(mediaConn, otherVideo.current);
      
        if (!mediaConnection) setMediaConnection(mediaConn);

        mediaConn.on('close', () => {
          console.log("mediaConnection closed remotely");
          closeVideo(otherVideo.current);
        });
      };
      if (dataConnection['caller'] === peer.id) {
        const mediaConn = peer.call(dataConnection.peer, localStream);
        if (!mediaConnection) setMediaConnection(mediaConn);

        dispose = showStream(mediaConn, otherVideo.current);
      } else {
        peer.on('call', handler);
      }
      // returned function will be called on component unmount
      return () => {
        if (mediaConnection) {
          console.log("Call::close mediaConnection");
          mediaConnection.close();
        }
        peer.off('call', handler);
        dispose();
      };
    }
  }, [dataConnection, peer, otherVideo, localStream, mediaConnection]);

  React.useEffect(() => {
    if (!dataConnection) {
      console.log("Not connection")
      // router.push('/chat');
    } else {
      const dataHandler = (message: string) => {
        appendMessage(message, false);
      };
      const closeHandler = () => {
        console.log("Call::Clean dataConnection");
        closeVideo(otherVideo.current);
        setDataConnection(undefined);
      };
      dataConnection.on('data', dataHandler);
      dataConnection.on('close', closeHandler);
      return () => {
        dataConnection.off('data', dataHandler);
        dataConnection.off('close', closeHandler);
      };
    }
  }, [dataConnection]);

  const submit = React.useCallback(
    (ev) => {
      const input = ev.currentTarget.elements.namedItem('message') as HTMLInputElement;
      const message = input.value;
      ev.preventDefault();
      dataConnection.send(message);
      appendMessage(message, true);
      input.value = '';
    },
    [dataConnection],
  );

  const disconnect = React.useCallback(() => {
    dataConnection.close();
    setDataConnection(undefined);
    closeVideo(otherVideo.current);
  }, [dataConnection]);


  function closeVideo(video: HTMLVideoElement) {
    if (video) {
      video.pause();
      video.srcObject = null;
    }
  }

  function showVideo(stream: MediaStream, video: HTMLVideoElement, muted: boolean) {
    // console.log("Should play stream", video);
    video.srcObject = stream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();
  }
  
  function showStream(mediaConn, otherVideo: HTMLVideoElement) {
    const handler = (remoteStream: MediaStream) => {
      // console.log("Remote stream: ", remoteStream)
      showVideo(remoteStream, otherVideo, false);
    };
    mediaConn.on('stream', handler);
  
    return () => mediaConn.off('stream', handler);
  }

  return (
    <>
      <div className="container">
        {/* <h1>
          {peer?.id} ⬄ {dataConnection?.peer} <button onClick={disconnect}>Hang up</button>
        </h1> */}
        <h3>Chat</h3>
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
