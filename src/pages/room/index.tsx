// import { useCallback, useState, useEffect } from 'react';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// import PeerJs from 'peerjs';

const Call = dynamic(
  () => import('../../components/call'),
  { ssr: false }
);

// const PeerJs = dynamic(
//   () => import('peerjs'),
//   { ssr: false }
// );


import { PeerContextProvider, PeerContext } from '../../contexts/PeerContext';
import { StreamContextProvider, StreamContext } from '../../contexts/StreamContext';


export default function CastMain () {

  const router = useRouter()

  const {
    user
  } = router.query


  return (
    <StreamContextProvider>
      <PeerContextProvider initialContext={{
        user: user
      }}>
        <Cast user={user} />
      </PeerContextProvider>
    </StreamContextProvider>
  )
}


function Cast({ user }) {
  const selfVideo = React.useRef();
  const otherVideo = React.useRef();

  const [localStream, setLocalStream] = React.useState(null);
  const [ otherUserName, setOtherUserName ] = React.useState(null);

  const { peer, connection, setConnection } = React.useContext(PeerContext);
  const { startMediaStream } = React.useContext(StreamContext)
  // console.log("Peer from context:", peer)

  const callUser = () => {
    const connection = peer.connect(otherUserName);
    connection['caller'] = peer.id;
    setConnection(connection);
  }

  React.useEffect(() => {
    if (peer && !connection) {
      const handler = (connection) => {
        connection['caller'] = connection.peer;
        setConnection(connection);
      };
      peer.on('connection', handler);
      return () => peer.off('connection', handler);
    }
  }, [peer, connection, setConnection]);


  React.useEffect(() => {
    startMediaStream()
      .then((stream) => {
        showVideo(stream, selfVideo.current, true);
        setLocalStream(stream);
      })
      .catch((error) => {
        console.log('Failed to get local stream', error);
      });
  }, []);

  function showVideo(stream: MediaStream, video: HTMLVideoElement, muted: boolean) {
    console.log("Should play stream", video);
    video.srcObject = stream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();
  }

  return (
    <>
    <h1>Hi, {peer?.id}</h1>
    <div className="container">
      <div className="container__half">
        <div className="video">
          <video ref={otherVideo} width={300} />
        </div>
        <div className="video">
          <video ref={selfVideo} width={300} />
        </div>
      </div>

      <div className="container__half">
        <div>
          <label>Name to call:</label>
          <input name="name" onChange={e => setOtherUserName(e.target.value)} />
          <button onClick={ callUser }>Call</button>
        </div>
        {
          connection && <Call localStream={ localStream } otherVideo={ otherVideo } />
        }
      </div>

    </div>
    <style jsx>{`
      .container {
        display: flex;
      }
      .container__half {
        flex: 1;
      }
      .video {
        background-image: url("/broken_stream.gif");
        background-repeat: no-repeat;

        // background-color: #cccccc; /* Used if the image is unavailable */
        width: 300px;
        height: 224px; /* You must set a specified height */
        
        margin-bottom: 15px;
      }
    `}</style>
    </>
  );
};
