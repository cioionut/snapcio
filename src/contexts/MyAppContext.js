import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import io from 'socket.io-client';

import { StreamContext } from './StreamContext';
// import { SocketContext } from './SocketContext';


const { RTCPeerConnection, RTCSessionDescription } = window;
const peerConnection = new RTCPeerConnection();

export const MyAppContext = createContext({
  peerConnection: null,
  callUser: (socketId) => {},
  connectedUsers: [],
  remoteStream: null
});

// import useSocket from '../hooks/useSocket';

function useSocket(url) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;

    // should only run once and not on every re-render,
    // so pass an empty array
  }, [])

  return socket
}

export const MyAppContextProvider = ({ children }) => {


  const [ remoteStream, setRemoteStream ] = useState(null);

  const [ connectedUsers, setConnectedUsers ] = useState([]);
  const [ getCalled, setGetCalled ] = useState(false);
  const [ isAlreadyCalling, setIsAlreadyCalling ] = useState(false);

  const { startMediaStream } = useContext(StreamContext);
  // const { socket } = useContext(SocketContext);
  const socket = useSocket('http://localhost:5000');

  // handle sockets
  useEffect(() => {
    if (socket) {
      socket.on("update-user-list", ({ users }) => {
        updateUserList(users);
      });
    
      socket.on("remove-user", ({ socketId }) => {
        removeUser(socketId);
      });
    
      socket.on("call-made", async data => {
        if (getCalled) {
          const confirmed = confirm(
            `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
          );
          if (!confirmed) {
            socket.emit("reject-call", {
              from: data.socket
            });
            return;
          }
        }
        // sdp
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
      
        socket.emit("make-answer", {
          answer,
          to: data.socket
        });
        setGetCalled(true);
      });
    
      socket.on("answer-made", async data => {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      
        if (!isAlreadyCalling) {
          callUser(data.socket);
          setIsAlreadyCalling(true);
        }
      });
      
      socket.on("call-rejected", data => {
        alert(`User: "Socket: ${data.socket}" rejected your call.`);
        // unselectUsersFromList();
      });
    }

  }, [socket]);
  
  // set remote stream
  peerConnection.ontrack = function({ streams: [stream] }) {
    setRemoteStream(stream);
  };

  // functions
  const updateUserList = (socketIds) => {
    console.log(`updateUserList::ids: ${socketIds}`);
    // todo: find a better way to update the list
    setConnectedUsers(socketIds);
  }
  const removeUser = (socketId) => {
    console.log(`removeUser::ids: ${socketId}`);
    // todo: find a better way to update the list
    setConnectedUsers(connectedUsers.filter(usrSocketId => usrSocketId != socketId));
  }

  const callUser = async (socketId) => {
    console.log(`callUser:: ${socketId}`);
    
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
  
    socket.emit("call-user", {
      offer,
      to: socketId
    });
  };

  // add local stream tracks to peerConnection
  useEffect(() => {
    startMediaStream()
      .then((stream) => {
        console.log('set tracks');
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
      })
      .catch((error) => {
        console.log('Failed to get local stream', error);
      });
  }, [])

  return (
    <MyAppContext.Provider value={{
      peerConnection,
      callUser,
      connectedUsers,
      remoteStream
    }}>
      {children}
    </MyAppContext.Provider>
  )

}