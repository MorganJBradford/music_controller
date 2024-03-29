import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';

export default function Room({clearRoomCode}) {
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [song, setSong] = useState(null);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const toggleShowSettings = () => setShowSettings(!showSettings);

  const authenticateSpotify = () => {
    fetch('/spotify/is-authenticated')
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch('/spotify/get-auth-url')
          .then((response) => response.json())
          .then((data) => {
            if (data === {}) setSong(null);
            window.location.replace(data.url);
          });
        }
      });
  }

  const getCurrentSong = () => {
    fetch('/spotify/current-song')
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      }).then((data) => {
        setSong(data);
      })
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
      if (data.is_host) {
        authenticateSpotify();
      }
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

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='primary' onClick={() => toggleShowSettings(true)}>
          Settings
        </Button>
      </Grid>
    );
  }

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <CreateRoomPage
            update={true}
            votes={votesToSkip}
            canPause={guestCanPause}
            code={roomCode}
            updateCallBack={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align='center'>
          <Button variant='contained' color='secondary' onClick={toggleShowSettings}>
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  useEffect(() => {
    getRoomDetails();

    //! Spotify does not support websockets for free
    const getSongTimer = setInterval(() => getCurrentSong(), 1000);
    return () => {
      clearInterval(getSongTimer);
    }
  },[])


  return (
    showSettings ?
      renderSettings()
    :
    <Grid container spacing={1}>
      <Grid item xs={12} align='center'>
        <Typography variant='h4' component='h4'>
          Code: {roomCode}
        </Typography>
      </Grid>
      {song &&
        <MusicPlayer song={song}/>
      }
      {isHost &&
        renderSettingsButton()
      }
      <Grid item xs={12} align='center'>
        <Button variant='contained' color='secondary' onClick={leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
