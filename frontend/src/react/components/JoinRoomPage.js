import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function JoinRoomPage() {
  const [roomCode, setRoomCode] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setRoomCode(e.target.value);
  }

  const roomButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: roomCode
      })
    };
    fetch('/api/join-room', requestOptions).then((response) => {
      if (response.ok) {
        navigate(`/room/${roomCode}`)
      } else {
        setError('Room not found.');
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align='center'>
        <Typography variant='h4' component='h4'>
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <TextField
          error={error}
          label='Code'
          placeholder='Enter a Room Code'
          value={roomCode}
          helperText={error}
          variant='outlined'
          onChange={(e)=>handleTextChange(e)}
        />
      </Grid>
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='primary' to='/' onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='secondary' to='/' component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
