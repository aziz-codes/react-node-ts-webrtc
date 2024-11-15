import { createContext, useContext } from "react";
import socketIO from "socket.io-client";
const url = "http://localhost:8080";

const RoomContext = createContext<null | any>(null);

const socket = socketIO(url);

export const RoomContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <RoomContext.Provider value={socket}>{children}</RoomContext.Provider>;
};

export const useSocket = ()=>useContext(RoomContext);
