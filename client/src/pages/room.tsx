import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/room-context";
import VideoPlayer from "../components/video-player";
 
const Room = () => {
  const { id } = useParams();
const [users,setUsers] = useState([]);
  const { socket, me,items ,stream} = useSocket();

  useEffect(() => {
    if (me && id) {
  
      socket.emit("join-room", { roomId: id, peerId: me._id });
    }
  }, [id,me]);

   
  useEffect(()=>{
   socket.on("get-users",(data:any)=>{
    console.log(data); 
  
   if(id){
    setUsers(data[id])
   }
  })
  },[id,socket])

 

if(!me) return <h4>Me is still loading, pelase wait for a while ...</h4>
  return <div className="flex flex-col gap-3">
    <p>{id}</p>
     <div className="w-44 h-44 rounded-md border">
      <VideoPlayer stream={stream}/>
     </div>
  </div>;
};

export default Room;

// test commit