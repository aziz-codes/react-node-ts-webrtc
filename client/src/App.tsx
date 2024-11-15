import  { useEffect } from 'react'
import { useSocket } from './context/room-context';

const App = () => {
  const socket = useSocket();
  useEffect(()=>{
 
  },[])
  return (
    <div className='flex min-h-screen justify-center items-center'>
      <button className='px-8 py-2 rounded-md bg-slate-800 text-white hover:ring-1 text-lg'>Start a new meeting</button>
    </div>
  )
}

export default App