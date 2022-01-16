import { useRef, useState, useCallback, useContext, useEffect } from 'react';

import { Box, CircularProgress }  from '@mui/material';
// local
import { StreamsContext } from '../contexts/StreamsContext';


export default function OtherVideo() {
  const otherVideo = useRef(null);
  const {
    remoteStream,
    setRemoteStream
  } = useContext(StreamsContext);

  function gotStream(stream, muted=false) {
    const video = otherVideo.current;
    video.srcObject = stream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();
  };

  useEffect(() => {
    if (remoteStream) gotStream(remoteStream);
  }, [remoteStream]);

  return (
    <>
      {/* <Container> */}
        <Box sx={{
          display: 'flex',
          my: 3,
          // width: 400,
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          // backgroundImage: 'url("/broken_stream.gif")',
        }}
        > 
        {
          !remoteStream
          ? <CircularProgress />
          : <video ref={otherVideo}/>
        }
        </Box>
        
      {/* </Container> */}

      <style jsx>{`
        video {
          max-width: 100%;
          max-height: 100%;
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