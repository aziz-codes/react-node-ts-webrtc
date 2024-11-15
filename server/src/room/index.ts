import { Socket } from "socket.io";

export const roomHandler = (socket: Socket) => {
    // create room handler
  const createRoom = () => {
    console.log("user created a new room");
  };

//   join room handler.
  const joinRoom = () => {
    console.log("join room event triggered.");
  };

  socket.on("create-room", createRoom);

  // join room event.
  socket.on("join-room", joinRoom);
};
