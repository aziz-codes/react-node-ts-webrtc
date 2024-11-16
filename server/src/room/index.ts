import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

const rooms: Record<string, string[]> = {};

interface IRoomParams {
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {
  // create room handler
  const createRoom = () => {
    const roomId = uuidV4();
    rooms[roomId] = [];
    socket.emit("room-created", { roomId });
    console.log("user created a new room");
  };

  const leaveRoom = ({roomId,peerId}:IRoomParams)=>{
    if(rooms[roomId]){
      rooms[roomId] = rooms[roomId].filter((id)=>id !==peerId);
    }
  }




  //   join room handler.
  const joinRoom = ({ roomId, peerId }: IRoomParams) => {

    console.log(
      `Room ID is ${roomId} & peer ID is ${peerId}`
    );
    if (rooms[roomId]) {
      console.log('duplicate tab room in this block')
      rooms[roomId].push(peerId);
      socket.join(roomId);

      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
      console.log('current room details are ',rooms)
    }

    socket.emit('get-users',rooms)
   
    socket.on("disconnect",()=>{
        console.log(`ID ${peerId} left the room`);
        leaveRoom({roomId,peerId})
    })
};



function getAllUsers(){
  console.log('emitting all users',rooms)
  socket.emit('get-users',{rooms});
}



  socket.on("create-room", createRoom);

  // join room event.
  socket.on("join-room", joinRoom);

  // get all users
  socket.on('get-users',getAllUsers);
};
