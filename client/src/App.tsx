import React, { useEffect } from 'react'
import socket from 'socket.io-client'

const App = () => {
  const url = "http://localhost:8080"
  useEffect(()=>{
    socket(url);
  },[])
  return (
    <div>App</div>
  )
}

export default App