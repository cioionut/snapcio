import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

const Call = dynamic(
  () => import('../../components/call'),
  { ssr: false }
);
const fetcher = (url) => fetch(url).then((res) => res.json());

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
  const selfVideo = useRef(null);
  const otherVideo = useRef(null);

  const [ localStream, setLocalStream ] = useState(null);

  const { peer, dataConnection, setDataConnection } = useContext(PeerContext);
  const { startMediaStream } = useContext(StreamContext);

  const callUser = (otherUser) => {
    const connection = peer.connect(otherUser);
    connection['caller'] = peer.id;
    setDataConnection(connection);
  }

  const { data: connectedPeers, error } = useSWR(
    process.env.NEXT_PUBLIC_PEERJSSERVER_API_URL,
    fetcher
  );

  const nextUser = () => {
    if (connectedPeers && peer) {
      const otherPeers = connectedPeers.filter(elem => elem !== peer.id)
      // get a random peer to call
      const otherPeerId = otherPeers[Math.floor(Math.random() * otherPeers.length)];
      // call
      if (otherPeerId) callUser(otherPeerId);
    }
  };


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
    <h1>Snapcio - Ionkom Select</h1>
    <div className="container">
      <div className="container__half">
        <div>
          <video className={dataConnection ? '' : 'video'} ref={otherVideo} width={400} height={300} />
        </div>
        <div>
          <video className={localStream  ? '' : 'video'} ref={selfVideo} width={200} height={150} />
        </div>
      </div>

      <div className="container__half">
        <div>
          <button className='button' onClick={ nextUser }>Next</button>
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
        justify-content: center;
      }
      .video {
        background-image: url("/broken_stream.gif");
        background-repeat: no-repeat;

        // background-color: #cccccc; /* Used if the image is unavailable */
        // width: 300px;
        // height: 224px; /* You must set a specified height */
        
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
  );
};
