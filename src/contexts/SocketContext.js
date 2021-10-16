import { createContext } from 'react';

import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";

export const socket = socketio.connect('ws://localhost:5000');
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}