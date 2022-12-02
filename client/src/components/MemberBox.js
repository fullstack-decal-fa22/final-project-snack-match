import * as React from "react";
import styles from "./InputTextBox.module.css"

function MemberBox(props) {

    const memberNames = props.memberList;
    const fillerLength = 6 - props.memberList.length;
    for (let i = 0; i < fillerLength; i++) {
        memberNames.push("--------");
    };

    return(
        <div>
            {props.memberList.map(name => <p className={styles['text-box']}>{name}</p>)}
        </div>
    )
}

export default MemberBox;