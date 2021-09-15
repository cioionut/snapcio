import { useEffect, useState } from 'react';

export default function usePeer(config = {}) {
  const {
    onConnectionOpen,
    serverConfig
  } = config;

  const [peerInstance, setPeerInstance] = useState(null)
  const [peerStatus, setPeerStatus] = useState()
  const [peerId, setPeerId] = useState(null)

  const destroyPeerInstance = () => {
    if (!peerInstance) return
    peerInstance.disconnect();
    peerInstance.destroy();
    setPeerInstance(null)
  }

  useEffect(() => {    
    import('peerjs').then(({ default: Peer }) => {
      const peer = peerInstance ? peerInstance : new Peer(serverConfig)

      peer.on('open', () => {
        console.log('usePeer::Connection Open')
        setPeerInstance(peer)
        setPeerId(peer.id)
        setPeerStatus('open')
        onConnectionOpen?.(peer)
      })
  
      peer.on('disconnected', () => {
        console.log('usePeer::Peer desconnected')
        setPeerStatus('disconnected')
        destroyPeerInstance()
      })
  
      peer.on('close', () => {
        console.log('usePeer::Peer closed remotetly')
        destroyPeerInstance()
        setPeerStatus('close')
      })

      peer.on('error', (error) => {
        console.log('usePeer::Peer error', error, error.type)
        setPeerStatus('error')
        destroyPeerInstance()
      })
    });
    
    return () => {
      console.log("usePeer::Cleanup peerInstance")
      destroyPeerInstance()
    }

  }, [])

  return [peerInstance, peerId, peerStatus]

}
