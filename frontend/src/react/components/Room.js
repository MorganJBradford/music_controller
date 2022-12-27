import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';

export default function Room({navCode, clearRoomCode}) {
  const [votesToSkip, setVotesToSkip] = useState(null);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { roomCode } = useParams();
  const [code, setCode] = useState(navCode);
  const navigate = useNavigate();

  const toggleShowSettings = () => setShowSettings(!showSettings)

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='primary' onClick={() => toggleShowSettings(true)}>
          Settings
        </Button>
      </Grid>
    );
  }

  const getRoomDetails = async () => {
    await fetch(`/api/get-room?code=${roomCode}`).then((response) => {
      if (!response.ok) {
        clearRoomCode();
        navigate('/');
      }
      return response.json();
    })
    .then((data) => {
      setVotesToSkip(data.votes_to_skip);
      setGuestCanPause(data.guest_can_pause);
      setIsHost(data.is_host);
    })
  }

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    }
    fetch('/api/leave-room', requestOptions)
      .then((_response) => {
        clearRoomCode();
        navigate('/');
      }
    );
  }

  useEffect(() => {
    getRoomDetails();
  },[])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align='center'>
        <Typography variant='h4' component='h4'>
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <Typography variant='h6' component='h6'>
          Votes: {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <Typography variant='h6' component='h6'>
          Guest Can Pause: {guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <Typography variant='h6' component='h6'>
          Host: {isHost.toString()}
        </Typography>
      </Grid>
      {/* {isHost &&
        renderSettingsButton()
      } */}
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='secondary' onClick={leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
