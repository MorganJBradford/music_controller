import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Room(props) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const { roomCode } = useParams();

  return (
    <h1>test</h1>
  );
}
