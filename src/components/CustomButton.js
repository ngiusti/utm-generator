import React from "react";

export default function CustomButton(props) {
    return (
        <button onClick={props.buttonFunc} type={props.type}>
            {props.copy}
        </button>
    );
}
