import adapter from 'webrtc-adapter';
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

// tf
import * as blazeface from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs-core';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
// import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-backend-cpu';

tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);

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
      ideal: 1.333333     // 4:3 aspect is preferred
    }
  }
};

const vgaConstraints = {
  width: 640, height: 480
};


const svgaConstraints = {
  width: 800, height: 600
};

const pointSixNineM3Constraints = { // 0.69M3
  width: 960, height: 720
};

const sxgaMinusConstraints = { // 720p - hd equivalent for 4:3
  width: 1280, height: 960
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

const drawPredictions = (predictions, ctx, canvasWidth, canvasHeight, returnTensors, annotateBoxes) => {
  if (predictions.length > 0) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < predictions.length; i++) {
      if (returnTensors) {
        predictions[i].topLeft = predictions[i].topLeft.arraySync();
        predictions[i].bottomRight = predictions[i].bottomRight.arraySync();
        if (annotateBoxes) {
          predictions[i].landmarks = predictions[i].landmarks.arraySync();
        }
      }

      const start = predictions[i].topLeft;
      const end = predictions[i].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.fillRect(start[0], start[1], size[0], size[1]);

      if (annotateBoxes) {
        const landmarks = predictions[i].landmarks;

        ctx.fillStyle = 'blue';
        for (let j = 0; j < landmarks.length; j++) {
          const x = landmarks[j][0];
          const y = landmarks[j][1];
          ctx.fillRect(x, y, 5, 5);
        }
      }
    }
  }
}


export default function SelfVideo({ defaultMute=true, hFlip=false, faceDetect=false, stats=false }) {
  const {
    joinConv,
    stopConv,
    peerConnection
  } = useContext(WebRTCContext);
  const {
    localStream,
    setLocalStream
  } = useContext(StreamsContext);

  const selfVideo = useRef(null);
  const canvasRef = useRef(null);
  const videoWraperRef = useRef(null);

  const [ tfBackend, setTfBackend ] = useState('wasm');
  const [ predictFaceInterval, setPredictFaceInterval ] = useState(null);

  const [ showSettings, setShowSettings ] = useState(false);
  const [ devicePermission, setDevicePermission ] = useState(false);
  const [ devices, setDevices ] = useState([]);
  const [ audioInputSelect, setAudioInputSelect ] = useState('');
  const [ videoSelect, setVideoSelect ] = useState('');
  const [ selectedVideoSrc, setSelectedVideoSrc ] = useState(null);

  
  const [ audioSources, setAudioSources ] = useState([]);
  const [ videoSources, setVideoSources ] = useState([]);
  const audioOptions = audioSources.map(deviceInfo => 
    <MenuItem value={deviceInfo.deviceId} key={deviceInfo.deviceId}>{deviceInfo.label}</MenuItem>);
  const videoOptions = videoSources.map(deviceInfo => 
    <MenuItem value={deviceInfo.deviceId} key={deviceInfo.deviceId}>{deviceInfo.label}</MenuItem>);

  // predict face bbox
  const predict = useCallback(async (model) => {
    if (
      typeof selfVideo.current !== "undefined" &&
      selfVideo.current !== null &&
      selfVideo.current.readyState === 4 &&

      typeof canvasRef.current !== "undefined" &&
      canvasRef.current !== null
    ) {

      // Get Video Properties
      const video = selfVideo.current;
      const videoWidth = selfVideo.current.width;
      const videoHeight = selfVideo.current.height;

      // Make Detections
      const returnTensors = false;
      const flipHorizontal = hFlip;
      const annotateBoxes = true;

      const tfVideo = tf.browser.fromPixels(video);
      const vInput = tf.image.resizeBilinear(tfVideo, [videoHeight, videoWidth]);
      const predictions = await model.estimateFaces(
        vInput, returnTensors, flipHorizontal, annotateBoxes);
      
      tf.dispose(tfVideo);
      tf.dispose(vInput);

      // console.log(tf.memory());
      // console.log(predictions);
      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawPredictions(predictions, ctx, videoWidth, videoHeight, returnTensors, annotateBoxes)
      });
    }
  }, [selfVideo, canvasRef]);

  // canvas setup
  useEffect(() => {
    // console.log('canvas setup', selfVideo.current, canvasRef.current);
    if (devices && 
      typeof selfVideo.current !== "undefined" &&
      selfVideo.current !== null &&
      // selfVideo.current.readyState === 4 &&

      typeof canvasRef.current !== "undefined" &&
      canvasRef.current !== null
    ) {
      console.log('canvas setup', selfVideo.current, canvasRef.current);

      // Get Video Properties
      const video = selfVideo.current;

      const videoWidth = videoWraperRef.current ? videoWraperRef.current.scrollWidth : undefined;
      const videoHeight = videoWraperRef.current ? videoWraperRef.current.scrollHeight : undefined;

      // Set video width
      selfVideo.current.width = videoWidth;
      selfVideo.current.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

    }
  }, [devices]);

  //  Load blazeface
  const runFaceDetect = useCallback(async () => {
    const model = await blazeface.load();
    const intervalId = setInterval(() => {
      // console.log("Run predict");
      predict(model);
    }, 50);
    setPredictFaceInterval(intervalId);
  }, [predict, setPredictFaceInterval]);

  const tfSetup = useCallback(async () => {
    await tf.setBackend(tfBackend);
  }, [tfBackend]);

  useEffect(() => { tfSetup(); }, [tfSetup]);

  // Face detection
  useEffect(() => {
    if (faceDetect) {
      if (devicePermission && tf.ready() && !predictFaceInterval) {
        console.log('should start face detection');
        runFaceDetect();
      } else if (!devicePermission && predictFaceInterval) {
        clearInterval(predictFaceInterval);
        setPredictFaceInterval(null);
      }
    }
  }, [tfSetup, runFaceDetect, devicePermission, faceDetect, predictFaceInterval]);


  useEffect(() => {
    if (localStream && videoSources.length > 0) {
      const videoTracks = localStream.getVideoTracks();
      const currentTrack = videoTracks ? videoTracks[0] : undefined;
      const mediaSrc = videoSources.find(mediaSrc => mediaSrc.label === currentTrack.label);
      setVideoSelect(mediaSrc.deviceId);
      setSelectedVideoSrc(mediaSrc);

      // check for rear camera
      const selectedVSrcCap = mediaSrc.getCapabilities();
      if (selectedVSrcCap?.facingMode.length > 0) {
        if (selectedVSrcCap?.facingMode === 'environment') {
          hFlip = false;
        }
      }
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
        // console.log(sender.track);
        if (sender.track) {
          const tracksToReplace = newStream.getTracks().find(track => {
            return track.kind === sender.track.kind;
          });
          sender.replaceTrack(tracksToReplace);
        }
      });
    };

    // call join
    joinConv();

    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }, [selfVideo, defaultMute, setLocalStream, peerConnection, joinConv]);

  const start = useCallback((vSelect=videoSelect, audioInSelect=audioInputSelect) => {
    // stop already running stream
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
    };

    // const videoWraperWidth = videoWraperRef.current ? videoWraperRef.current.scrollWidth : undefined;
    // const videoWraperHeight = videoWraperRef.current ? videoWraperRef.current.scrollHeight : undefined;

    const constraints = {
      audio: {deviceId: audioInSelect ? {exact: audioInSelect} : undefined, echoCancellation: true },
      video: {
        deviceId: vSelect ? {exact: vSelect} : undefined,
        facingMode: 'user',
        aspectRatio: {
          ideal: 1.333333     // 4:3 aspect is preferred
        },
        width: {
          ideal: svgaConstraints.width, 
          max: sxgaMinusConstraints.width
          // max: videoWraperWidth
        },
        height: { 
          ideal: svgaConstraints.height,
          max: sxgaMinusConstraints.height
          // max: videoWraperHeight
        },
      }
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(gotStream)
      .then(gotDevices)
      .catch(handleGetUserMediaError);
  }, [localStream, audioInputSelect, videoSelect, gotStream, gotDevices, videoWraperRef]);

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
    stopConv();
  }, [localStream, setLocalStream, stopConv]);

  return (
    <>
      <Box sx={{
        display: 'flex',
        height: { xs: 300, md: 500 },
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
      }}
        ref={videoWraperRef}
      >
      {
        !devicePermission
        ? <CircularProgress />
        : <>
            <video className={hFlip ? 'video-hflip' : ''} ref={selfVideo}/>
            <canvas style={{position: 'absolute'}} id="predictions" ref={canvasRef}/>
          </>
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
        <Box sx={{ my: 2 }}>
          <FormControl>
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
        <Box sx={{ my: 2 }}>
          <FormControl>
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

      {/* show stats about camera */}
      {
        (stats && selfVideo.current) &&
        <Box sx={{ my: 2 }}>
          Current resolution (w:h): {selfVideo.current.videoWidth}x{selfVideo.current.videoHeight}
          <p>
            Device Capabilities: { selectedVideoSrc && JSON.stringify(selectedVideoSrc.getCapabilities(), null, 2) }
          </p>
        </Box>
      }

      <style jsx>{`
        video {
          // min-width: 100%; 
          // min-height: 100%;
          // width: auto; 
          // height: auto; 
          // z-index: -100;
          // background-size: cover;
          // overflow: hidden;

          // width: auto;
          // height: auto;
          width: 100%;
          height: 100%;
        }
        .video-hflip {
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
            // transform: rotateY(180deg);
            // -webkit-transform:rotateY(180deg); /* Safari and Chrome */
            // -moz-transform:rotateY(180deg); /* Firefox */
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