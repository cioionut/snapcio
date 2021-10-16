import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const url = "ws://localhost:5000";

export default function useSocket(eventName, cb) {

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketIo = io(url)

    setSocket(socketIo)

    function cleanup() {
      socketIo.disconnect()
    }
    return cleanup

    // should only run once and not on every re-render,
    // so pass an empty array
  }, [])

  useEffect(() => {

    if (socket) {
      console.log(`set-socket-on::${eventName} - ${socket.id}`);

      socket.on(eventName, cb);
  
      return function useSocketCleanup() {
        socket.off(eventName, cb);
      }
    }

  }, [eventName, cb]);

  return socket;
}