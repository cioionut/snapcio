import { useRef, useState, useCallback, useContext, useEffect } from 'react';

import { Box, CircularProgress, LinearProgress, Alert, AlertTitle }  from '@mui/material';

// local
import { StreamsContext } from '../contexts/StreamsContext';
import { WebRTCContext } from '../contexts/WebRTCContext';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export default function OtherVideo() {
  const otherVideo = useRef(null);
  const {
    remoteStream,
    setRemoteStream
  } = useContext(StreamsContext);

  const {
    availableUsers,
  } = useContext(WebRTCContext);

  const [ fakeAvailableUsers, setFakeAvailableUsers ] = useState(700);

  function gotStream(stream, muted=false) {
    const video = otherVideo.current;
    video.srcObject = stream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();
  };

  useEffect(() => {
    if (remoteStream) gotStream(remoteStream);
  }, [remoteStream]);


  useEffect(() => {
    const interval = setInterval(() => {
      setFakeAvailableUsers((avUsrs) => avUsrs + getRandomInt(-5, 15));
    }, 20*1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFakeAvailableUsers(700 + getRandomInt(-5, 15));
  }, []);

  const loadingVideo = <Box sx={{
    mx: { md: 1 },
    display: 'flex',
    flexDirection: 'column',
    height: { xs: 300, md: 720 },

    alignItems: 'center',
    backgroundColor: '#606060FF',
    // backgroundImage: 'url("/broken_stream.gif")',
  }}>
    {/* <CircularProgress /> */}
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
    {
      fakeAvailableUsers !== 700 && 
      <Box sx={{ mt: 10, color: '#D6ED17FF'}}>
        Available Users: {fakeAvailableUsers} - {availableUsers.length}
      </Box>
    }
  </Box>

  return (
    <>
      {
        !remoteStream
        ? loadingVideo
        : <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // height: '100%',
          height: { xs: 300, md: 720 },

          // clip video
          position: 'relative',
          // zIndex: -100,
          overflow: 'hidden',
          maxWidth: '100%'
          }}>
            <video ref={otherVideo} controls/>
          </Box>
      }
        
      <style jsx>{`
        video {
          position: relative;
          width: 101%;
          height: 101%;
          left: -.5%;
          top: -.5%;
          max-width: 101%;
          max-height: 101%;
          background: #000;
          object-fit: cover;
        }
        .video-hflip {
            transform: rotateY(180deg);
            -webkit-transform:rotateY(180deg); /* Safari and Chrome */
            -moz-transform:rotateY(180deg); /* Firefox */
        }
        .brokenvideo {
          background-image: url("/broken_stream.gif");
          background-repeat: no-repeat;
          background-color: #cccccc; /* Used if the image is unavailable */
          margin-bottom: 15px;
        }
      `}</style>
    </>
  )
}