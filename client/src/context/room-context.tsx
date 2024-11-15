import { createContext, useContext, useEffect } from "react";
import socketIO from "socket.io-client";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:8080";

const RoomContext = createContext<null | any>(null);

const socket = socketIO(url);

export const RoomContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const enterRoom = ({ roomId }: { roomId: string }) => {
    navigate(`/room/${roomId}`);
  };
  useEffect(() => {
    socket.on("room-created", enterRoom);
  }, []);

  return <RoomContext.Provider value={socket}>{children}</RoomContext.Provider>;
};

export const useSocket = () => useContext(RoomContext);
