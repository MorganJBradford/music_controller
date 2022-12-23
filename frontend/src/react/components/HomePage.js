import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';
import JoinRoomPage from './JoinRoomPage';

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<p>This is the home page</p>}/>
        <Route path='/join' element={<JoinRoomPage/>}/>
        <Route path='/create' element={<CreateRoomPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
