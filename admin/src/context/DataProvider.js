import { createContext } from "react";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:4000");
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);
  const state = { socket };
  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};
