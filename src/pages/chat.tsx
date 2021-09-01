// import { useCallback, useState, useEffect } from 'react';
import * as React from 'react';
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router';

import PeerJs from 'peerjs';

let peer: PeerJs;
let connection: PeerJs.DataConnection;


export default function Chat() {
  const router = useRouter();

  const [availablePeer] = React.useState(peer);
  const [availableConnection, setAvailableConnection] = React.useState(connection);

  const submit = React.useCallback(
    (ev) => {
      const input = ev.currentTarget.elements.namedItem('name') as HTMLInputElement;
      const otherUser = input.value;
      const connection = availablePeer.connect(otherUser);
      connection['caller'] = availablePeer.id;
      ev.preventDefault();
      setAvailableConnection(connection);
    },
    [availablePeer],
  );

  React.useEffect(() => {
    connection = availableConnection;

    if (!availablePeer) {
      router.push('/');
    } else if (availableConnection) {
      router.push('/call');
    } else {
      const handler = (connection: PeerJs.DataConnection) => {
        connection['caller'] = connection.peer;
        setAvailableConnection(connection);
      };
      peer.on('connection', handler);
      return () => peer.off('connection', handler);
    }
  }, [availablePeer, availableConnection, router]);

  return (
    <div>
      <h1>Hi, {availablePeer?.id}</h1>
      <form onSubmit={submit}>
        <label>Name to call:</label>
        <input name="name" />
        <button>Call</button>
      </form>
    </div>
  );
};
