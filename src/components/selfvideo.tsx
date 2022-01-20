// nextjs
import dynamic from 'next/dynamic';
// react
import { useContext, MouseEvent, useRef, useState, useEffect, useCallback } from 'react';
// material-ui
import { Box, InputLabel, MenuItem, FormControl, Select, Button, Container, CircularProgress, CardMedia, Card, IconButton }  from '@mui/material';
// import { MicIcon }  from '@mui/icons-material';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import StopIcon from '@mui/icons-material/Stop';
import SettingsIcon from '@mui/icons-material/Settings';

// local
import { StreamsContext } from '../contexts/StreamsContext';
import { WebRTCContext } from '../contexts/WebRTCContext';


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
    hangUpCall,
    peerConnection
  } = useContext(WebRTCContext);
  const {
    localStream,
    setLocalStream
  } = useContext(StreamsContext);

  const selfVideo = useRef(null);

  const [ showSettings, setShowSettings ] = useState(false);
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

  const gotDevices = useCallback((deviceInfos) => {
    setDevices(deviceInfos);
    const audioSrcs = deviceInfos.filter(deviceInfo => deviceInfo.kind === 'audioinput');
    const videoSrcs = deviceInfos.filter(deviceInfo => deviceInfo.kind === 'videoinput');
    setAudioSources(audioSrcs);
    setVideoSources(videoSrcs);
  }, []);

  const gotStream = useCallback((newStream, muted=defaultMute) => {
    setDevicePermission(true);
    setLocalStream(newStream); // make stream available
    const video = selfVideo.current;
    video.srcObject = newStream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();

    // optionally, if you have active peer connections:
    if (peerConnection)
      _replaceTracksForPeer(peerConnection);

    function _replaceTracksForPeer(peer) {
      peer.getSenders().map(function(sender) {
        console.log(sender.track)
        if (sender.track) {
          const tracksToReplace = newStream.getTracks().find(track => {
            return track.kind === sender.track.kind;
          });
          sender.replaceTrack(tracksToReplace);
        }
      });
    };

    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }, [selfVideo, defaultMute, setLocalStream, peerConnection]);

  const start = useCallback((vSelect=videoSelect, audioInSelect=audioInputSelect) => {
    // stop already running stream
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
    }
    const constraints = {
      audio: {deviceId: audioInSelect ? {exact: audioInSelect} : undefined, echoCancellation: true },
      video: {deviceId: vSelect ? {exact: vSelect} : undefined}
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(gotStream)
      .then(gotDevices)
      .catch(handleGetUserMediaError);
  }, [localStream, audioInputSelect, videoSelect, gotStream, gotDevices]);

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
    // fix the hanhupcall
    hangUpCall();
  }, [localStream, setLocalStream, hangUpCall]);

  const shouldShowdeviceSettings = (peerConnection && ['failed', 'closed'].includes(peerConnection.connectionState));

  return (
    <>
      <Box sx={{
        display: 'flex',
        height: { xs: 300, md: 500 },
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
      <Box sx={{ mt: 1 }}>
        { 
          !devicePermission 
          ? <Button variant="contained" color="error" onClick={handleStartDevice} startIcon={<PhotoCameraFrontIcon />}>GO LIVE</Button> 
          : <Button variant="outlined" color="error" onClick={handleStopDevice} startIcon={<StopIcon />}>Stop Live</Button>
        }
        {
          devicePermission &&
          <IconButton aria-label="settings" onClick={() => {setShowSettings(!showSettings && devicePermission)}} >
            <SettingsIcon color={showSettings ? 'primary' : 'inherit'} />
          </IconButton>
        }
      </Box>
      
      {
        (showSettings && videoSelect != '') &&
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
        (showSettings && audioInputSelect != '') &&
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