// import { useCallback, useState, useEffect } from 'react';
import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// import PeerJs from 'peerjs';

const Call = dynamic(
  () => import('../../components/call'),
  { ssr: false }
);

// const PeerJs = dynamic(
//   () => import('peerjs'),
//   { ssr: false }
// );


import { PeerContextProvider, PeerContext } from '../../contexts/PeerContext';


export default function CastMain () {

  const router = useRouter()

  const {
    user
  } = router.query


  return (
    <PeerContextProvider initialContext={{
      user: user
    }}>
      <Cast user={user} />
    </PeerContextProvider>
  )
}


function Cast({ user }) {
  const router = useRouter();

  const [ otherUserName, setOtherUserName ] = React.useState(null);

  const { peer, connection, setConnection } = React.useContext(PeerContext);
  // console.log(peer)

  const callUser = () => {
    const connection = peer.connect(otherUserName);
    connection['caller'] = peer.id;
    setConnection(connection);
  }


  React.useEffect(() => {

    if (!peer) {
      // console.log(peer);
      // router.push('/');
    } else if (connection) {
      // router.push('/call');
    } else {
      const handler = (connection) => {
        connection['caller'] = connection.peer;
        setConnection(connection);
      };
      peer.on('connection', handler);
      return () => peer.off('connection', handler);
    }
  }, [peer, connection, router]);

  return (
    <div>
      <h1>Hi, {peer?.id}</h1>
      <label>Name to call:</label>
      <input name="name" onChange={e => setOtherUserName(e.target.value)} />
      <button onClick={ callUser }>Call</button>

      {
        connection && <Call/>
      }
    </div>
  );
};
