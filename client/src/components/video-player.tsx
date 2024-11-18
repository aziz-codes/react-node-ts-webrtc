import React, { useEffect, useRef } from 'react'
 

const VideoPlayer: React.FC<{stream:MediaStream}>= ({stream}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(()=>{
  if(videoRef.current){
    videoRef.current.srcObject = stream;
  }
  },[stream])

  return (
    <video ref={videoRef} autoPlay  className='h-full w-full object-cover'>s</video>
  )
}

export default VideoPlayer