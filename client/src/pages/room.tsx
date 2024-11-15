import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSocket } from '../context/room-context';
const Room = () => {
    const {id} = useParams();

    const socket = useSocket();

    useEffect(()=>{
  socket.emit("join-room",{roomId:id})
    },[id])
  return (
    <div>Room ID is {id}</div>
  )
}

export default Room