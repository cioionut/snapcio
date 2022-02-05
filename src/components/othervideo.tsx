import { useRef, useState, useCallback, useContext, useEffect } from 'react';

import { Box, CircularProgress, LinearProgress, Alert, AlertTitle }  from '@mui/material';
import { green, yellow, red } from '@mui/material/colors';

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
    setFakeAvailableUsers(availableUsers.length * 1000 + fakeAvailableUsers + getRandomInt(-15, 15));
    const interval = setInterval(() => {
      setFakeAvailableUsers(availableUsers.length * 1000 + fakeAvailableUsers + getRandomInt(-15, 15));
    }, 20*1000);
    return () => clearInterval(interval);
  }, []);

  const loadingVideo = <Box sx={{
    mx: { md: 1 },
    display: 'flex',
    flexDirection: 'column',
    height: { xs: 300, md: 720 },
    // justifyContent: 'center',
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
        Available Users: {fakeAvailableUsers}
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
          height: { xs: 300, md: 720 },
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <video ref={otherVideo} controls/>
        </Box>
      }
        
        

      <style jsx>{`
        video {
          width: 100%;
          height: 100%;
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