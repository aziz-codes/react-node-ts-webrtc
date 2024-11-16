 import { useSocket } from "../context/room-context"
const JoinRoomBtn = () => {
    const {socket} = useSocket();
const createRoom = ()=>{
    socket.emit("create-room");
}
  return (
    <button className='px-8 py-2 rounded-md bg-slate-800 text-white hover:ring-1 text-lg'
    onClick={createRoom}
    >Start a new meeting</button>
  )
}

export default JoinRoomBtn