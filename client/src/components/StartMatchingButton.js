import React from 'react';
import styles from '../styles/Button.module.css'; 
import { useNavigate } from 'react-router-dom';

const Button = (props) => {

  const navigate = useNavigate();

  let styleObj = {};
  if (props.backgroundColor) {
    styleObj.backgroundColor = props.backgroundColor;
  }

  const navigateToSwiping = () => {
    navigate('/swiping', { state: { nickname: props.nickname }})
  }
  
  return(
    <div>
      <button onClick={navigateToSwiping} style={styleObj} className={styles['rectangle-button']}>{props.children}</button>
    </div>
  )
}

export default Button;