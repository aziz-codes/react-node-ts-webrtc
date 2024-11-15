 
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
 import { BrowserRouter,Routes, Route  } from 'react-router-dom';
import { RoomContextProvider} from './context/room-context';
import Home from './pages/home';
import Room from './pages/room';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
 <RoomContextProvider>
<Routes>
<Route path='/' element={<Home />}/>
<Route path='/room/:id' element={<Room />}/>

</Routes>
  {/* <App /> */}
 </RoomContextProvider>
  </BrowserRouter>
 
);

 
