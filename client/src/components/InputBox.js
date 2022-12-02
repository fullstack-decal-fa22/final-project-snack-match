import React from "react";
import styles from "./InputTextBox.module.css"

function InputBox({ input, setInput, placeholder }) {

    return(
        <div className={styles['text-box']}>
            <input 
                className = {styles['text-input']} 
                placeholder={placeholder} 
                value={input} 
                onChange={e => setInput(e.target.value)}
            />
            <br>
            </br>
        </div>

    )
}

export default InputBox;