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
      socket.to(roomId).emit("user-disconnected",peerId)
    }
  }




  //   join room handler.
  const joinRoom = ({ roomId, peerId }: IRoomParams) => {
   console.log(`new user with peer id ${peerId} joined room`)
    if (rooms[roomId]) {
   
      rooms[roomId].push(peerId);
      socket.join(roomId);
     

      socket.to(roomId).emit("user-joined",{peerId})

      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
       
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


// hanlder to start share screen.

const startSharing=({peerId,roomId}:IRoomParams)=>{
socket.to(roomId).emit("user-started-sharing",peerId)
}

const stopSharing = (roomId:string)=>{
  socket.to(roomId).emit("user-stop-sharing");
}
  socket.on("create-room", createRoom);

  // join room event.
  socket.on("join-room", joinRoom);

  // get all users
  socket.on('get-users',getAllUsers);

  socket.on("start-sharing",startSharing)
  socket.on("stop-sharing",stopSharing)
};
