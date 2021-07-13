import React from "react";

export default function CustomButton(props) {
    return (
        <button
            onClick={props.buttonFunc}
            type={props.type}
            className="button"
            disabled={props.disabled}
        >
            {props.copy}
        </button>
    );
}
