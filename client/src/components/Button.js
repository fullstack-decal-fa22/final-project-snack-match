import React from 'react';
import styles from './Button.module.css'; 

const Button = (props) => {

  let styleObj = {};
  if (props.backgroundColor) {
    styleObj.backgroundColor = props.backgroundColor;
  }

  return(
    <div>
        <button style={styleObj} className={styles['rectangle-button']}>{props.children}</button>
    </div>
  )
}

export default Button;