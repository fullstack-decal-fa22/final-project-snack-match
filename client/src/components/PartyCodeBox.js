import * as React from "react";
import styles from "./InputTextBox.module.css"

function PartyCodeBox(props) {

    return(
        <div className={styles['text-box']}>
            <input className = {styles['text-input']} placeholder="Party Code" />
            <br>
            </br>
        </div>

    )
}

export default PartyCodeBox;