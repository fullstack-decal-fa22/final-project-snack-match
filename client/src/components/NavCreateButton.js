import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const NavCreateButton = (props) => {

  const navigate = useNavigate();
  
  const navigateToCreatePage = () => {
    //send nickname to backend
    navigate('/create')
  }

  return(
    <Button 
      variant="primary"
      onClick={() => navigateToCreatePage()}
    >
      Create Party
    </Button>
  )
}

export default NavCreateButton;