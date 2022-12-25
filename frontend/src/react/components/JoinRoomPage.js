import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export default function JoinRoomPage() {
  const [roomCode, setRoomCode] = useState(null);
  const [error, setError] = useState(null);

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
        />
      </Grid>
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='primary' to='/'>
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
