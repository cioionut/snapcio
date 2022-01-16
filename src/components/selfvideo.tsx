// nextjs
import dynamic from 'next/dynamic';
// react
import { useContext, MouseEvent, useRef, useState, useEffect, useCallback } from 'react';
// material-ui
import { Box, InputLabel, MenuItem, FormControl, Select, Button, Container, CircularProgress, CardMedia, Card }  from '@mui/material';
// import { MicIcon }  from '@mui/icons-material';

// local
import { StreamsContext } from '../contexts/StreamsContext';


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


export default function SelfVideo() {

  const {
    localStream,
    setLocalStream
  } = useContext(StreamsContext);

  const selfVideo = useRef(null);

  const [ devicePermission, setDevicePermission ] = useState(false);
  const [ devices, setDevices ] = useState([]);
  const [ audioInputSelect, setAudioInputSelect ] = useState('');
  const [ videoSelect, setVideoSelect ] = useState('');
  
  const [ audioSources, setAudioSources ] = useState([]);
  const [ videoSources, setVideoSources ] = useState([]);
  const audioOptions = audioSources.map(deviceInfo => 
    <MenuItem value={deviceInfo.deviceId} key={deviceInfo.deviceId}>{deviceInfo.label}</MenuItem>);
  const videoOptions = videoSources.map(deviceInfo => 
    <MenuItem value={deviceInfo.deviceId} key={deviceInfo.deviceId}>{deviceInfo.label}</MenuItem>);

  const gotDevices = (deviceInfos) => {
    setDevices(deviceInfos);
  };

  function gotStream(stream, muted=false) {
    setLocalStream(stream); // make stream available
    const video = selfVideo.current;
    video.srcObject = stream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();

    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  };

  const start = useCallback((vSelect=videoSelect, audioInSelect=audioInputSelect) => {
    // stop already running stream
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
    }
    const constraints = {
      audio: {deviceId: audioInSelect ? {exact: audioInSelect} : undefined},
      video: {deviceId: vSelect ? {exact: vSelect} : undefined}
    };
    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
  }, [localStream, audioInputSelect, videoSelect]);

  const handleChangeVideo = useCallback(event => {
    setVideoSelect(event.target.value);
    start(event.target.value);
  }, [start]);

  const handleChangeAudioInput = useCallback(event => {
    setAudioInputSelect(event.target.value);
    start(undefined, event.target.value);
  }, [start]);

  const handleStartDevice = useCallback((event=null) => {
    let vSelect, audioInSelect;
    navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
      setDevices(deviceInfos);
      const audioSrcs = deviceInfos.filter(deviceInfo => deviceInfo.kind === 'audioinput');
      const videoSrcs = deviceInfos.filter(deviceInfo => deviceInfo.kind === 'videoinput');
      setAudioSources(audioSrcs);
      setVideoSources(videoSrcs);
      if (audioSrcs.length > 0) {
        audioInSelect = audioSrcs[0].deviceId;
        setAudioInputSelect(audioInSelect);
      };
      if (videoSrcs.length > 0) {
        vSelect = videoSrcs[0].deviceId;
        setVideoSelect(vSelect);
      };
    }).catch(handleError);
    start(vSelect, audioInSelect);
    setDevicePermission(true);
  }, [start]);

  const handleStopDevice = useCallback((event=null) => {
    setDevicePermission(false);
    // stop already running stream
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
    };
    selfVideo.current.srcObject = null;
    setLocalStream(null);
  }, [localStream]);


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
          backgroundColor: 'black'
        }}
        > 
        {
          !devicePermission
          ? <CircularProgress />
          : <video  ref={selfVideo}/>
        }
        </Box>
        <Box>
          { 
            !devicePermission 
            ? <Button variant="outlined" onClick={handleStartDevice}>Start Camera</Button> 
            : <Button variant="outlined" color="error" onClick={handleStopDevice}>Stop Camera</Button>
          }
        </Box>
        {
          devicePermission &&
          <Box sx={{ minWidth: 120, my: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="select-camera-source-label">Camera source</InputLabel>
              <Select
                labelId="select-camera-source-label"
                id="select-camera-source"
                value={videoSelect}
                label="Select Camera"
                onChange={handleChangeVideo}
              >
                { videoOptions }
              </Select>
            </FormControl>
          </Box>
        }
        {
          devicePermission &&
          <Box sx={{ minWidth: 120, my: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="select-audio-source-label">Audio source</InputLabel>
              <Select
                labelId="select-audio-source-label"
                id="select-audio-source"
                value={audioInputSelect}
                label="Select audio"
                onChange={handleChangeAudioInput}
              >
                { audioOptions }
              </Select>
            </FormControl>
          </Box>
        }
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