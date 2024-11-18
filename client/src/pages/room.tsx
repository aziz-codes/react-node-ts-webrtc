import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/room-context";
import VideoPlayer from "../components/video-player";
import { PeerState } from "../context/peer-reducer";
 
const Room = () => {
  const { id } = useParams();
const [users,setUsers] = useState([]);
  const { socket, me,peers ,stream} = useSocket();

  useEffect(() => {
    if (me && id) {
  
      socket.emit("join-room", { roomId: id, peerId: me._id });
    }
  }, [id,me,socket]);

   
  useEffect(()=>{
   socket.on("get-users",(data:any)=>{
    
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
     <div className="flex flex-col gap-2">
      <h4>Participants view</h4>
      {Object.values(peers as PeerState).map((peer,index)=>(
        <div className="flex flex-row gap-2 h-44 w-44 rounded-md border" key={index}>
          <VideoPlayer stream={peer.stream}/>
        </div>
      ))}
     </div>
  </div>;
};

export default Room;

// test commit