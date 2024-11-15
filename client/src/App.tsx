import  { useEffect } from 'react'
import { useSocket } from './context/room-context';
import JoinRoomBtn from './components/join-room-btn';

const App = () => {
  const socket = useSocket();
   
  return (
    <div className='flex min-h-screen justify-center items-center'>
     <JoinRoomBtn />
    </div>
  )
}

export default App