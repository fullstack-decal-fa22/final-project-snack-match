import React from 'react';
import styles from './Button.module.css'; 
import {Routes, Route, useNavigate, Navigate, Link, redirect} from 'react-router-dom';

const Button = (props) => {

  const navigate = useNavigate();
  
  const navigateToSwiping = () => {
    navigate('/swiping')
  }

  let styleObj = {};
  if (props.backgroundColor) {
    styleObj.backgroundColor = props.backgroundColor;
  }

  return(
    <div>
        <button onClick={navigateToSwiping} style={styleObj} className={styles['rectangle-button']}>{props.children}</button>
    </div>
  )
}

export default Button;