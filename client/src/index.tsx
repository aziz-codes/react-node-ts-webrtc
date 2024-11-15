 
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
 
import { RoomContextProvider } from './context/room-context';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 <RoomContextProvider>

   <App />
 </RoomContextProvider>
 
);

 
