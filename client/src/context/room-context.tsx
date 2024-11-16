import { createContext, useContext, useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import {v4 as uuidV4} from 'uuid';
const url = "http://localhost:8080";

const RoomContext = createContext<null | any>(null);

const socket = socketIO(url);

export const RoomContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [me,setMe] = useState<Peer>()

  const [items, setItems] = useState<string[]|null>(null);


  const enterRoom = ({ roomId }: { roomId: string }) => {
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({participants}:{participants:string[]})=>{
  console.log({participants})
   setItems(participants)
  }
  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId);
    setMe(peer)
    socket.on("room-created", enterRoom);


    socket.on('get-users',getUsers)
  }, []);

  return <RoomContext.Provider value={{socket,me,items}}>{children}</RoomContext.Provider>;
};

export const useSocket = () => useContext(RoomContext);
