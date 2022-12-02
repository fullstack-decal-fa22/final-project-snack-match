import React from 'react';
import styles from './Button.module.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Button = (props) => {

  const navigate = useNavigate();
  
  const navigateToHostParty = () => {

    const params = {
      nickname: props.nickname,
      location: "Berkeley",
      distance: props.distance, 
      price: props.priceList, 
      limit: 10 
    };
    console.log(params);
    axios
      .post('http://localhost:9000/party/create', params)
      .then(() => navigate('/hostParty', { state: { nickname: props.nickname }}))
      .catch((error) => console.log(error.response.data));
  };

  let styleObj = {};
  if (props.backgroundColor) {
    styleObj.backgroundColor = props.backgroundColor;
  };

  return(
    <div>
        <button onClick={navigateToHostParty} style={styleObj} className={styles['rectangle-button']}>{props.children}</button>
    </div>
  )
}

export default Button;