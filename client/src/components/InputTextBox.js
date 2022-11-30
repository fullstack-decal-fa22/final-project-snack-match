import * as React from "react";
import { TextInput } from 'react-native';

function InputTextBox(props) {
    function handleSubmit(event) {
        event.preventDefault()
    }

    return(
        <><><form onSubmit = {handleSubmit}>
            <input placeholder="Party Code" />
        </form><form>
                <input placeholder="Nickname" />
            </form></><button> Enter </button></>

    )
}