import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Room(props) {
  const [votesToSkip, setVotesToSkip] = useState(null);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const { roomCode } = useParams();

  const getRoomDetails = () => {
    fetch(`/api/get-room?code=${roomCode}`).then((response) =>
      response.json()
    ).then((data) => {
      setVotesToSkip(data.votes_to_skip);
      setGuestCanPause(data.guest_can_pause);
      setIsHost(data.is_host);
    })
  }

  useEffect(() => {
    getRoomDetails();
  },[])

  return (
    <h1>{votesToSkip}</h1>
  );
}
