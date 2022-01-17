// react
import { useContext, MouseEvent, useRef, useState, useEffect, useCallback } from 'react';
// material-ui
import { Box, InputLabel, MenuItem, FormControl, Select, Button, Container, CircularProgress, CardMedia, Card }  from '@mui/material';
// import { MicIcon }  from '@mui/icons-material';

// local
import { StreamsContext } from '../contexts/StreamsContext';

// Output an error message to console.
function log_error(text) {
  const time = new Date();
  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}

const mediaConstraints = {
  audio: { echoCancellation: true },            // We want an audio track
  video: {
    aspectRatio: {
      ideal: 1.333333     // 3:2 aspect is preferred
    }
  }
};

// Handle errors which occur when trying to access the local media
// hardware; that is, exceptions thrown by getUserMedia(). The two most
// likely scenarios are that the user has no camera and/or microphone
// or that they declined to share their equipment when prompted. If
// they simply opted not to share their media, that's not really an
// error, so we won't present a message in that situation.
const handleGetUserMediaError = (error) => {
  log_error(error);
  switch(error.name) {
    case "NotFoundError":
      alert("Unable to open your call because no camera and/or microphone" +
            "were found.");
      break;
    case "SecurityError":
    case "PermissionDeniedError":
      // Do nothing; this is the same as the user canceling the call.
      break;
    default:
      alert("Error opening your camera and/or microphone: " + error.message);
      break;
  }
}


export default function SelfVideo({ defaultMute=true, hFlip=false }) {

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


  useEffect(() => {
    if (localStream && videoSources.length > 0) {
      const videoTracks = localStream.getVideoTracks();
      const currentTrack = videoTracks ? videoTracks[0] : undefined;
      const mediaSrc = videoSources.find(mediaSrc => mediaSrc.label === currentTrack.label);
      setVideoSelect(mediaSrc.deviceId);
    }
  }, [videoSources, localStream]);

  useEffect(() => {
    if (localStream && audioSources.length > 0) {
      const audioTracks = localStream.getAudioTracks();
      const currentTrack = audioTracks ? audioTracks[0] : undefined;
      const mediaSrc = audioSources.find(mediaSrc => mediaSrc.label === currentTrack.label);
      setAudioInputSelect(mediaSrc.deviceId);
    }
  }, [audioSources, localStream]);

  const gotDevices = (deviceInfos) => {
    setDevices(deviceInfos);
    const audioSrcs = deviceInfos.filter(deviceInfo => deviceInfo.kind === 'audioinput');
    const videoSrcs = deviceInfos.filter(deviceInfo => deviceInfo.kind === 'videoinput');
    setAudioSources(audioSrcs);
    setVideoSources(videoSrcs);
  };

  function gotStream(stream, muted=defaultMute) {
    setDevicePermission(true);
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
    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleGetUserMediaError);
  }, [localStream, audioInputSelect, videoSelect, gotDevices]);

  const handleChangeVideo = useCallback(event => {
    setVideoSelect(event.target.value);
    start(event.target.value);
  }, [start]);

  const handleChangeAudioInput = useCallback(event => {
    setAudioInputSelect(event.target.value);
    start(undefined, event.target.value);
  }, [start]);

  const handleStartDevice = useCallback((event=null) => {
    start();
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
  }, [localStream, setLocalStream]);


  return (
    <>
      {/* <Container> */}
        <Box sx={{
          display: 'flex',
          my: 1,
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
          : <video className={hFlip ? 'video-hflip' : ''} ref={selfVideo}/>
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
          videoSelect != '' &&
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
          audioInputSelect != '' &&
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