import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const NavJoinButton = () => {

  const navigate = useNavigate();
  
  const navigateToJoinPage = () => {
    navigate('/join')
    //send party ID and nickname to backend
  }

  return(
    <Button 
      variant="secondary"
      onClick={() => navigateToJoinPage()}
    >
      Join Party
    </Button>
  )
}

export default NavJoinButton;