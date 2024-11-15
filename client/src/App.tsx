 
import { useSocket } from './context/room-context';
import CreateRoomBtn from './components/create-room-btn';

const App = () => {
  const socket = useSocket();
   
  return (
    <div className='flex min-h-screen justify-center items-center'>
     <CreateRoomBtn />
    </div>
  )
}

export default App