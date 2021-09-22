import { createContext, useState } from 'react';
import usePeer from '../hooks/usePeer';

export const PeerContext = createContext({
  peer: null, // PeerInstance
  peerId: null,
  peerStatus: null,
  dataConnection: null, // connection
  setDataConnection: (conn) => {}
});


export const PeerContextProvider = ({ children, initialContext }) => {

  const {
    user,
  } = initialContext;
  const serverConfig = process.env.NEXT_PUBLIC_ENV === 'production'
  ? undefined 
  : {
    host: 'peerjs.cio.ionkom.com',
    port: 80, // default 443
    path: '/myapp',
  }

  const [peer, peerId, peerStatus] = usePeer({
    onConnectionOpen: (peer) => {},
    serverConfig
  });

  const [dataConnection, setDataConnection] = useState(null);
  // let renderCounter = useRef(0);
  // renderCounter = renderCounter.current+1
  // console.log("Render: ", renderCounter)

  return (
    <PeerContext.Provider value={{
      peer,
      peerId,
      peerStatus,
      dataConnection,
      setDataConnection
    }}>
      {children}
    </PeerContext.Provider>
  )

}