import React, { useEffect } from 'react'
import socket from 'socket.io-client'

const App = () => {
  const url = "http://localhost:8080"
  useEffect(()=>{
    socket(url);
  },[])
  return (
    <div>
      <button className='text-red-500'>start a new meeting.</button>
    </div>
  )
}

export default App