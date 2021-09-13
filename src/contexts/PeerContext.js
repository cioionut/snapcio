import { useEffect, createContext, useState, useRef } from 'react';
import usePeer from '../hooks/usePeer';

export const PeerContext = createContext({
  peer: null, // PeerInstance
  connection: null, // connection
  setConnection: (conn) => {}
});


export const PeerContextProvider = ({ children, initialContext }) => {

  const {
    user,
  } = initialContext;
  const serverConfig = process.env.NEXT_PUBLIC_ENV === 'production'
  ? undefined 
  : {
    host: 'localhost',
    port: 9000,
    path: '/myapp'
  }

  const [peer, peerId, peerStatus] = usePeer({
    onConnectionOpen: (peer) => {},
    serverConfig
  });

  // const [peer, setPeer] = useState(null);
  // useEffect(() => { 
  //   import('peerjs').then(({ default: Peer }) => {
  //     if (!peer && user) {
  //       setPeer(new Peer(user, serverConfig));
  //     }
  //   });
  // },  [user, peer]);

  const [connection, setConnection] = useState(null);
  // let renderCounter = useRef(0);
  // renderCounter = renderCounter.current+1
  // console.log("Render: ", renderCounter)

  return (
    <PeerContext.Provider value={{
      peer,
      connection,
      setConnection: setConnection
    }}>
      {children}
    </PeerContext.Provider>
  )

}