import { useEffect, createContext, useState } from 'react';

import usePeer from '../hooks/usePeer';



export const PeerContext = createContext({
  peer: null, // PeerInstance
  peerId: null, // PeerId of the connection
  peerStatus: null, // Status of PeerJS
  connectedPeers: [], // Tracked incoming peers
})

export const PeerContextProvider = ({ children, initialContext }) => {

  const {
    roomId,
    roomMetadata: initialRoomMetadata,
    user,
    isHost,
  } = initialContext



  const [peerListenersInitialized, setPeerListenersInitialized] = useState(false)

  // Main peer connection to host
  const [connToHost, setConnToHost] = useState(null)


  const [peer, peerId, peerStatus] = usePeer({
    peerId: isHost ? roomId : null,
    onConnectionOpen: (peer) => {
      // TODO: Auto connect to room
      // log('=== onConnectionOpen', roomId)
      if (isHost) return
      connectToHost(peer, roomId)
    },
  })

  const log = (content, e) => {
    console.log(`PeerContext::${user?.name}::`, content, e)
  }

  // Connect to Host/Room (only listeners)
  const connectToHost = (peer, roomId) => {
    log(`Connect to ${roomId}`)
    const conn = peer.connect(roomId, {
      metadata: {
        user,
      },
      serialization: 'json',
    })
    setConnToHost(conn)
  }


  useEffect(() => {
    if (!peer) return
    if (peerListenersInitialized) return
    peer.on('connection', (conn) => {
      // Incoming connection
      // Room Host only
      log(`Incoming peer connection ${conn.peer}`)

      conn.on('data', (data) => {
        log(`Incoming peer data ${conn.peer}`, data)
        const {
          action,
          payload
        } = data
        // TODO: Features to implement
        if (action === 'sendReaction') onPeerSendReaction(conn, payload)
        // if (action === 'sendQuestion') sendQuestion(payload)
      })

      conn.on('close', () => {
        log(`Closed peer connection ${conn.peer}`)
        setConnectedPeers(connectedPeersRef.current.filter(peer => peer.peer !== conn.peer))
      })

      conn.on('open', () => {
        log(`Stablished peer connection ${conn.peer}`)
        setConnectedPeers([...connectedPeersRef.current, conn])
        conn.send({
          action: 'roomMetadata',
          payload: roomMetadata,
        })
        // Auto start stream to peer
        startStreamToPeer(conn.peer)
      })
    })

    peer.on('call', call => {
      log('Received call', call)

      // Call can be closed by peer or speaker
      call.answer()
      call.on('stream', audioStream => {
        onSpeakerStarsStream(call, audioStream)
      })
      call.on('close', () => { log('Close call'); onSpeakerClosesStream(call)})
      call.on('error', () => { log('Error call'); onSpeakerClosesStream(call)})
      
    })

    peer.on('disconnected', () => {
      log('Peer desconnected')
    })

    setPeerListenersInitialized(true)
  }, [peer])


  return (
    <PeerContext.Provider value={{
      state: {
        roomId,
        peer,
        peerId,
        peerStatus,
        connToHost,
      },

    }}>
      {children}
    </PeerContext.Provider>
  )

}
