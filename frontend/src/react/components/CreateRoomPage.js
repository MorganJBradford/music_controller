import React, { useState } from 'react';
import {
  Alert,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


export default function CreateRoomPage({update, votes, canPause, code, updateCallBack}) {
  const defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(update ? canPause : true);
  const [votesToSkip, setVotesToSkip] = useState(update ? votes : defaultVotes);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChangeVotes = (e) => {
    setVotesToSkip(e.target.value);
  }

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === 'true' ? true : false);
  }

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        guest_can_pause: guestCanPause,
        votes_to_skip: votesToSkip
      }),
    };
    fetch('/api/create-room', requestOptions)
    .then((response) => response.json())
    .then((data) => navigate(`/room/${data.code}`))
  }

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        guest_can_pause: guestCanPause,
        votes_to_skip: votesToSkip,
        code: code
      }),
    };
    fetch('/api/update-room', requestOptions)
    .then((response) => {
      if (response.ok) {
        setSuccess('Room updated successfully!');
      } else {
        setError('Error updating room')
      }
      updateCallBack();
    });
  }

  const title = update ? 'Update Room': 'Create a Room';

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={success || error}>
          {success ?
            <Alert
              severity='success'
              onClose={()=>setSuccess(null)}
            >
              {success}
            </Alert>
          :
            <Alert
              severity='error'
              onClose={()=>setError(null)}
            >
              {error}
            </Alert>
          }
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography
          component='h4'
          variant='h4'
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl
          component='fieldset'
        >
          <FormHelperText>
            <div align='center'>
              Guest Control of Playback State
            </div>
          </FormHelperText>
          <RadioGroup row defaultValue={`${guestCanPause}`} onChange={(e)=>handleGuestCanPauseChange(e)}>
            <FormControlLabel
              value='true'
              control={
                <Radio color="primary"/>
              }
              label='Play/Pause'
              labelPlacement='bottom'
            />
            <FormControlLabel
              value='false'
              control={
                <Radio color="secondary"/>
              }
              label='No Control'
              labelPlacement='bottom'
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align='center'>
        <FormControl>
          <TextField
            required={true}
            type='number'
            onChange={(e)=>handleChangeVotes(e)}
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: {textAlign: 'center'}
            }}
          />
          <FormHelperText>
            <div align='center'>
              Votes Required to Skip Song
            </div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color='primary' variant='contained' onClick={update ? handleUpdateButtonPressed : handleRoomButtonPressed}>
          {title}
        </Button>
      </Grid>
      {!update &&
        <Grid item xs={12} align='center'>
          <Button color='secondary' variant='contained' to='/' component={Link}>Back</Button>
        </Grid>
      }
    </Grid>
  );
}
