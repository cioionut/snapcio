
import { useContext, useState, useEffect, useRef } from 'react';

// locals
import { MyAppContextProvider, MyAppContext } from '../contexts/MyAppContext';
import { StreamContextProvider } from '../contexts/StreamContext';
// import { SocketContextProvider, SocketContext } from '../contexts/SocketContext';

import UserList from './list/users';


export default function ChatMain() {
  return (
    <>
      {/* <SocketContextProvider> */}
        <StreamContextProvider>
          <MyAppContextProvider>
            <Chat/>
          </MyAppContextProvider>
        </StreamContextProvider>
      {/* </SocketContextProvider> */}
    </>
  )
};


function Chat() {
  const selfVideo = useRef(null);
  const otherVideo = useRef(null);

  const [ isRemoteStream, setIsRemoteStream ] = useState(false);
  const { connectedUsers, localStream, remoteStream } = useContext(MyAppContext);

  // set local stream
  useEffect(() => {
    if (!localStream) return;
    console.log('should show LOCAL stream');
    showVideo(localStream, selfVideo.current, true);
  }, [localStream]);

  // set remote stream
  useEffect(() => {
    if (!remoteStream) return;
    console.log('should show REMOTE stream');
    showVideo(remoteStream, otherVideo.current, false);
    setIsRemoteStream(true);
  }, [remoteStream]);


  function showVideo(stream: MediaStream, video: HTMLVideoElement, muted: boolean) {
    // console.log("Should play stream", video);
    video.srcObject = stream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();
  }


  const nextUser = () => {
    console.log('not implemented yet');
  };


  return (
    <>
      <div className="container">
          <div className="container__half">
            <div>
              <video className={'brokenvideo'} ref={otherVideo} width={400} height={300} />
            </div>
            <div>
              <video className={localStream  ? '' : 'brokenvideo'} ref={selfVideo} width={200} height={150} />
            </div>
          </div>

          <div className="container__half">
            <div>
              <button className='button' onClick={ nextUser }>Next</button>
            </div>
          </div>

          <div>
            <UserList users={ connectedUsers } invite={ undefined }/>
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
          .brokenvideo {
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
  )
};