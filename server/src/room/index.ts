import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";
export const roomHandler = (socket: Socket) => {
  // create room handler
  const createRoom = () => {
    const roomId = uuidV4();
    socket.join(roomId);
    socket.emit("room-created", { roomId });
    console.log("user created a new room");
  };

  //   join room handler.
  const joinRoom = ({roomId}:{roomId:string}) => {
     console.log(`join room event and the ID is ${roomId}`)
  };

  socket.on("create-room", createRoom);

  // join room event.
  socket.on("join-room", joinRoom);
};
