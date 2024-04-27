import React, { useContext, createContext, useMemo } from 'react'
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
}

const SocketProvider = (props) => {
  const socketUrl = import.meta.env.VITE_SOCKET_URL;
  console.log(socketUrl)
  const socket = useMemo(() => io(socketUrl));

  return (
    <SocketContext.Provider value={{ socket }}>{props.children}</SocketContext.Provider>
  )
}

export default SocketProvider