
import * as React from 'react';
import PeerJs from 'peerjs';
import { useRouter } from 'next/router';

let peer: PeerJs;
let connection: PeerJs.DataConnection;
const getUserMedia = navigator.getUserMedia || navigator['webkitGetUserMedia'] || navigator['mozGetUserMedia'];


import { PeerContextProvider, PeerContext } from '../contexts/PeerContext';


export default function Call() {
  const router = useRouter();

  const otherVideo = React.useRef();
  const selfVideo = React.useRef();
  const [messages, setMessages] = React.useState([]);
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
    if (connection && peer) {
      let dispose = () => {};
      const handler = (call: PeerJs.MediaConnection) => {
        getUserMedia(
          { video: true, audio: true },
          (stream) => {
            showVideo(stream, selfVideo.current, true);
            call.answer(stream);
          },
          (error) => {
            console.log('Failed to get local stream', error);
          },
        );

        dispose = showStream(call, otherVideo.current);
      };

      if (connection['caller'] === peer.id) {
        getUserMedia(
          { video: true, audio: true },
          (stream) => {
            showVideo(stream, selfVideo.current, true);
            dispose = showStream(peer.call(connection.peer, stream), otherVideo.current);
          },
          (error) => {
            console.log('Failed to get local stream', error);
          },
        );
      } else {
        peer.on('call', handler);
      }

      return () => {
        peer.off('call', handler);
        dispose();
      };
    }
  }, [connection, peer]);

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

  return (
    <div>
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
      <form onSubmit={submit}>
        <input name="message" />
        <button>Send</button>
      </form>
    </div>
  );
};


function showVideo(stream: MediaStream, video: HTMLVideoElement, muted: boolean) {
  video.srcObject = stream;
  video.volume = muted ? 0 : 1;
  video.onloadedmetadata = () => video.play();
}

function showStream(call: PeerJs.MediaConnection, otherVideo: HTMLVideoElement) {
  const handler = (remoteStream: MediaStream) => {
    showVideo(remoteStream, otherVideo, false);
  };
  call.on('stream', handler);

  return () => call.off('stream', handler);
}