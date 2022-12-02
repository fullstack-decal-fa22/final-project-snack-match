import React, { useState, useEffect } from 'react';
import styles from './Button.module.css'; 
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Button = (props) => { 

  const navigate = useNavigate();
  
  const navigateToHost = () => {

    const params = {
      nickname: props.nickname,
      partyId: props.partyId
    };

    axios
      .post('http://localhost:9000/party/join', params)
      .then(() => navigate('/party'))
      .catch((error) => console.log(error.response.data));
  }

  let styleObj = {};
  if (props.backgroundColor) {
    styleObj.backgroundColor = props.backgroundColor;
  }

  return(
    <div>
        <button onClick={navigateToHost} style={styleObj} className={styles['rectangle-button']}>{props.children}</button>
    </div>
  )
}

export default Button;