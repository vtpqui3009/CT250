import { createContext } from "react";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:4000");
    // const socket = io("https://localhost:4000", {
    //   withCredentials: true,
    // });
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);
  const state = { socket };
  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};
// export const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: null,
// };
// export const reducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       localStorage.setItem("user", JSON.stringify(action.payload.user));
//       localStorage.setItem("token", JSON.stringify(action.payload.token));
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//         token: action.payload.token,
//       };
//     case "LOGOUT":
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };
