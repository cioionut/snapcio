import { createContext, useState } from 'react'

const StreamsContext = createContext({
  localStream: null,
  remoteStream: null,
  setLocalStream: (stream) => {},
  setRemoteStream: (stream) => {},
});

const StreamsContextProvider = ({ children }) => {
  const [ localStream, setLocalStream ] = useState(null);
  const [ remoteStream, setRemoteStream ] = useState(null);

  return (
    <StreamsContext.Provider value={{
      localStream,
      remoteStream,
      setLocalStream,
      setRemoteStream
    }}>
      {children}
    </StreamsContext.Provider>
  )
}

export { StreamsContext, StreamsContextProvider }
