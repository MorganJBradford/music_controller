import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';


export default function CreateRoomPage() {
  const defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

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
    .then((data) => console.log(data))
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography
          component='h4'
          variant='h4'
        >
          Create A Room
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
          <RadioGroup row defaultValue='true' onChange={(e)=>handleGuestCanPauseChange(e)}>
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
            defaultValue={defaultVotes}
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
        <Button color='primary' variant='contained' onClick={handleRoomButtonPressed}>Create a Room</Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color='secondary' variant='contained' to='/' component={Link}>Back</Button>
      </Grid>
    </Grid>
  );
}
