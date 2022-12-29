import React from 'react';
import { Card, Grid, Typography, LinearProgress, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MusicPlayer({song}) {
  const songProgress = (song.time / song.duration) * 100;
  console.log(songProgress);
  return (
    <Card>
      <Grid container alignItems='center'>
        <Grid item xs={4} align='center'>
          <img src={song.image_url} height='100%' width='100%'/>
        </Grid>
        <Grid item xs={8} align='center'>
          <Typography component='h5' variant='h5'>
            {song.title}
          </Typography>
          <Typography color='textSecondary' variant='subtitle1'>
            {song.artist}
          </Typography>
          <div>
            <IconButton>
              {song.is_playing ?
                <PauseIcon/>
              :
                <PlayArrowIcon/>
              }
            </IconButton>
            <IconButton>
              <SkipNextIcon/>
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant='determinate' value={songProgress}/>
    </Card>
  );
}
