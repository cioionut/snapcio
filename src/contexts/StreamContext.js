import adapter from 'webrtc-adapter';
import { useEffect, createContext, useState } from 'react'

const StreamContext = createContext({
  muteToggle: () => {},
  micMuted: false,
  mediaStream: null,
  startMediaStream: null
});

const StreamContextProvider = ({ children }) => {
  const [mediaStream, setMediaStream] = useState(null)
  const [mediaStreamError, setMediaStreamError] = useState()
  const [streamAccess, setStreamAccess] = useState(false)
  const [micMuted, setMicMuted] = useState(false)

  function startMediaStream() {
    if (mediaStream) return mediaStream

    try {
      const stream = navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      setMediaStream(stream)
      return stream
    } 
    catch(err) {
      setMediaStreamError(err)
      return err
    }
  }

  function checkMicPermission() {
    navigator.permissions.query(
      { name: 'microphone' }
    ).then(function(permissionStatus){
      setStreamAccess(permissionStatus.state)
    })
  }

  function muteToggle() {
    if (!mediaStream) return
    const stream = mediaStream.getAudioTracks()[0]
    setMicMuted(stream.enabled)
    stream.enabled = !stream.enabled
  }

  return (
    <StreamContext.Provider value={{
      checkMicPermission,
      startMediaStream,
      mediaStream,
      micAccess: streamAccess,
      muteToggle,
      micMuted,
    }}>
      {children}
    </StreamContext.Provider>
  )
}

export { StreamContext, StreamContextProvider }
