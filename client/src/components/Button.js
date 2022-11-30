import React from 'react';
import styles from './Button.module.css'; 

const Button = (props) => {
  return(
    <div className = {styles['rectangle-button']}>
        <button>{props.text}</button>
    </div>
  )
}

export default Button;