import React from 'react';
import logo from './fullstack_logo_design.png';
import styles from './LogoAndWebsite.module.css';

function Logo() {
    return(
        <div>
            <img src = {logo} className = {styles['logo']} alt = "fullstack logo"/>
            <h1 className = {styles['site']}>SnackMatch</h1>
        </div>
    )
}

export default Logo;