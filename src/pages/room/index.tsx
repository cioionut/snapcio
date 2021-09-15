import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Call = dynamic(
  () => import('../../components/call'),
  { ssr: false }
);

import { PeerContextProvider, PeerContext } from '../../contexts/PeerContext';
import { StreamContextProvider, StreamContext } from '../../contexts/StreamContext';


export default function CastMain () {

  const router = useRouter()

  const {
    user
  } = router.query


  return (
    <>
    { user &&
        <StreamContextProvider>
        <PeerContextProvider initialContext={{
          user: user
        }}>
          <Cast user={user} />
        </PeerContextProvider>
      </StreamContextProvider>
    }
    </>

  )
}


function Cast({ user }) {
  const selfVideo = useRef();
  const otherVideo = useRef();

  const [ localStream, setLocalStream ] = useState(null);
  const [ otherUserName, setOtherUserName ] = useState(null);

  const { peer, dataConnection, setDataConnection } = useContext(PeerContext);
  const { startMediaStream } = useContext(StreamContext);

  const callUser = () => {
    const connection = peer.connect(otherUserName);
    connection['caller'] = peer.id;
    setDataConnection(connection);
  }

  useEffect(() => {
    const handler = (connection) => {
      connection['caller'] = connection.peer;
      setDataConnection(connection);
    };
    if (peer && !dataConnection) {
      peer.on('connection', handler);
    };
    // returned function will be called on component unmount
    return () => {
      if (peer) peer.off('connection', handler);
      if (dataConnection) {
        dataConnection.close();
        console.log("Cleanup dataConnection");
      };
    }
  }, [peer, dataConnection]);


  useEffect(() => {
    if (!localStream)
      startMediaStream()
        .then((stream) => {
          showVideo(stream, selfVideo.current, true);
          setLocalStream(stream);
        })
        .catch((error) => {
          console.log('Failed to get local stream', error);
        });

    // returned function will be called on component unmount
    return () => {
      console.log(`Trying to clean media ${localStream}`);
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        console.log("Cleanup media stream tracks");
      }
    }
  }, [localStream]);

  function showVideo(stream: MediaStream, video: HTMLVideoElement, muted: boolean) {
    // console.log("Should play stream", video);
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
          dataConnection && <Call localStream={ localStream } otherVideo={ otherVideo } />
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
