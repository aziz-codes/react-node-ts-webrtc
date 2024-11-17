import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/room-context";
 
const Room = () => {
  const { id } = useParams();
const [users,setUsers] = useState([]);
  const { socket, me,items } = useSocket();

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
    <h4>Room ID  {id}</h4>
    <div className="flex flex-col gap-2">
      <h4>users in room</h4>

     <pre> {JSON.stringify(items)}</pre>
    
    </div>
  </div>;
};

export default Room;

// test commit