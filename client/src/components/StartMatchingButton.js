import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const StartMatchingButton = (props) => {

  const navigate = useNavigate();

  const navigateToRestaurants = () => {
    navigate('/restaurants', { state: { nickname: props.nickname }})
  }
  
  return(
    <Button variant="primary" onClick={() => navigateToRestaurants()}>Start Matching</Button>
  )
}

export default StartMatchingButton;