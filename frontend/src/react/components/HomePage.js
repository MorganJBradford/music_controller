import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';
import JoinRoomPage from './JoinRoomPage';
import Room from './Room';
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';

function RenderHomePage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align='center'>
        <Typography variant='h3' component='h3'>
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <ButtonGroup disableElevation variant='contained' color='primary'>
          <Button color='primary' to='/join' component={ Link }>
            Join a Room
          </Button>
          <Button color='secondary' to='/create' component={ Link }>
            Create a Room
          </Button>
          {/* {roomCode &&
            <Button color='secondary' to={`/room/${roomCode}`} component={ Link }>
              Return to Previous Room
            </Button>
          } */}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default function Home() {
  const [roomCode, setRoomCode] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
        if (data.code) {
          navigate(`/room/${data.code}`)
        }
      })
  },[])

  const clearRoomCode = () => {
    setRoomCode(null);
  }

  return (
    <Routes>
      <Route exact path='/' element={
        <RenderHomePage/>
      }/>
      <Route path='/join' element={<JoinRoomPage/>}/>
      <Route path='/create' element={<CreateRoomPage/>}/>
      <Route path='/room/:roomCode' element={<Room roomCode={roomCode} clearRoomCode={clearRoomCode} />}/>
    </Routes>
  );
}
