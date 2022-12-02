import * as React from "react";
import styles from "./InputTextBox.module.css"

function NicknameBox(props) {


    return(
        <div className={styles['text-box']}>
                <input className = {styles['text-input']} placeholder="Nickname" />
                <br>
                </br>
        </div>

    )
}

export default NicknameBox;