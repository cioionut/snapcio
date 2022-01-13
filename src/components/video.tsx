import { useContext, MouseEvent, useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const mediaConstraints = {
  audio: true,            // We want an audio track
  video: {
    aspectRatio: {
      ideal: 1.333333     // 3:2 aspect is preferred
    }
  }
};

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}


export default function Video() {
  const selfVideo = useRef(null);

  const [ localStream, setLocalStream ] = useState(null);
  const [ devices, setDevices ] = useState([]);
  const [ audioInputSelect, setAudioInputSelect ] = useState();
  const [ videoSelect, setVideoSelect ] = useState();
  
  const videoSources = devices.filter(deviceInfo => deviceInfo.kind === 'videoinput');
  const videoOptions = videoSources.map(deviceInfo => {
    let deviceLabel;
    const deviceId = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      deviceLabel = deviceInfo.label;
      return <MenuItem value={deviceId} key={deviceId}>{deviceLabel}</MenuItem>
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  });

  const gotDevices = (deviceInfos) => {
    setDevices(deviceInfos);
  };
  function gotStream(stream, muted=false) {
    setLocalStream(stream); // make stream available to console
    const video = selfVideo.current;
    video.srcObject = stream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();

    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }

  useEffect(() => {
    // navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
    navigator.mediaDevices.enumerateDevices().then(setDevices).catch(handleError);
    start();
  }, []);

  const start = useCallback((event=null) => {
    console.log('here', localStream);
    let vSelect = videoSelect;
    if (event) {
      vSelect = event.target.value;
      setVideoSelect(event.target.value);
    }

    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
    }
    const constraints = {
      // audio: {deviceId: audioInputSelect ? {exact: audioInputSelect} : undefined},
      audio: true,
      video: {deviceId: vSelect ? {exact: vSelect} : undefined}
    };
    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
  }, [localStream]);

  // const getUsrMedia = useCallback(async () => {
  //   // Get access to the webcam stream and attach it to the
  //   // "preview" box (id "local_video").
  //   try {
  //     const webcamStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
  //     // show media stream
  //     showVideo(webcamStream, selfVideo.current, true);
  //     // set for future refs
  //     setLocalStream(webcamStream);

  //   } catch(err) {
  //     handleError(err);
  //     return;
  //   }
  // }, []);


  return (
    <>
      <video className={`${localStream  ? '' : 'brokenvideo'}`} ref={selfVideo}/>
      {
        videoSources.length > 0 &&
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Camera source</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={videoSources[0].deviceId}
              label="Select Camera"
              onChange={start}
            >
              { videoOptions }
            </Select>
          </FormControl>
        </Box>
      }



      <style jsx>{`
        video {
          max-width: 100%;
          height: auto;
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