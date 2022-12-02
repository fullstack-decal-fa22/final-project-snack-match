import React from 'react';
import styles from './Button.module.css'; 

const Button = (props) => {
  return(
    <div>
        <button className = {styles['rectangle-button']}>{props.text}</button>
    </div>
  )
}

export default Button;