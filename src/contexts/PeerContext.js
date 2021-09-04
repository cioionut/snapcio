import { useEffect, createContext, useState, useRef } from 'react';
// import Peer from 'peerjs';


export const PeerContext = createContext({
  peer: null, // PeerInstance
  connection: null, // connection
  setConnection: (conn) => {}
});


export const PeerContextProvider = ({ children, initialContext }) => {

  const {
    user,
  } = initialContext;

  const [peer, setPeer] = useState(null);
  const [connection, setConnection] = useState(null);
  // let renderCounter = useRef(0);
  // renderCounter = renderCounter.current+1
  // console.log("Render: ", renderCounter)
  const serverConfig = process.env.NEXT_PUBLIC_ENV === 'production'
                  ? undefined 
                  : {
                    host: 'localhost',
                    port: 9000,
                    path: '/myapp'
                  }

  useEffect(() => { 
    import('peerjs').then(({ default: Peer }) => {
      if (!peer && user) {
        setPeer(new Peer(user, serverConfig));
      }
    });
  },  [user, peer]);


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