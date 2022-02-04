import { useRef, useState, useCallback, useContext, useEffect } from 'react';

import { Box, CircularProgress, LinearProgress }  from '@mui/material';
// local
import { StreamsContext } from '../contexts/StreamsContext';
import { WebRTCContext } from '../contexts/WebRTCContext';


export default function OtherVideo() {
  const otherVideo = useRef(null);
  const {
    remoteStream,
    setRemoteStream
  } = useContext(StreamsContext);

  const {
    availableUsers,
  } = useContext(WebRTCContext);

  function gotStream(stream, muted=false) {
    const video = otherVideo.current;
    video.srcObject = stream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();
  };

  useEffect(() => {
    if (remoteStream) gotStream(remoteStream);
  }, [remoteStream]);

  const loadingVideo = <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    height: { xs: 300, md: 720 },
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    // backgroundImage: 'url("/broken_stream.gif")',
  }}>
    {/* <CircularProgress /> */}
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
    <Box sx={{ mt: 10 }}>
      Available Users: {availableUsers.length}
    </Box>
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