import * as React from "react";
import styles from "./InputTextBox.module.css"

function MemberBox(props) {

    return(
        <div>
            <p className={styles['text-box']}>Host</p>
            <p className={styles['text-box']}>Member 1</p>
            <p className={styles['text-box']}>Member 2</p>
            <p className={styles['text-box']}> Member 3</p>
            <p className={styles['text-box']}>Member 4</p>
            <p className={styles['text-box']}>Member 5</p>
        </div>

    )
}

export default MemberBox;