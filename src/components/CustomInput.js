import React from "react";

export default function CustomInput(props) {
    function checkInput(e) {
        props.valueFunc(props.tag, e.target.value);
    }

    let input;

    if (props.type === "dropdown") {
        const listItems = props.data.map((el) => (
            <option key={el} value={el}>
                {el}
            </option>
        ));
        input = (
            <select
                onChange={(e) => checkInput(e)}
                className="input"
                required={props.required}
            >
                <option>Select One</option>
                {listItems}
            </select>
        );
    } else {
        input = (
            <input
                onChange={(e) => checkInput(e)}
                className="input"
                required={props.required}
                value={props.value}
                readOnly={props.readOnly}
            />
        );
    }
    return (
        <div className="input__wrap">
            <h3 className="input-header">{props.label}</h3>
            {input}
        </div>
    );
}
