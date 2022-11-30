import * as React from "react";
import styles from "./InputTextBox.module.css"

function InputTextBox(props) {

    function handleSubmit(event) {
        event.preventDefault()
    }

    return(
        <div>
            <input className = {styles['text-box']} placeholder = "Party Code"/>
            <br>
            </br>
            <input className = {styles['text-box']} placeholder = "Nickname"/>
            <br>
            </br>
        </div>

    )
}

export default InputTextBox;