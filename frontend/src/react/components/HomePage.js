import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';
import JoinRoomPage from './JoinRoomPage';
import Room from './Room';
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';

export default function Home() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={
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
              </ButtonGroup>
            </Grid>
          </Grid>
        }/>
        <Route path='/join' element={<JoinRoomPage/>}/>
        <Route path='/create' element={<CreateRoomPage/>}/>
        <Route path='/room/:roomCode' element={<Room />}/>
      </Routes>
    </BrowserRouter>
  );
}
