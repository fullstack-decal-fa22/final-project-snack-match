import React from 'react';
import styles from './Button.module.css'; 
import {useNavigate} from 'react-router-dom';

const Button = (props) => {

  const navigate = useNavigate();
  
  const navigateToHost = () => {
    navigate('/party')
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