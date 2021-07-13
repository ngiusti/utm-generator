import React from "react";

export default function CustomInput(props) {
    function checkInput(e) {
        props.valueFunc(props.tag, e.target.value);
    }

    let input;

    if (props.type === "dropdown") {
        const listItems = props.data.map((el, index) => (
            <option key={index} value={el}>
                {el}
            </option>
        ));
        input = (
            <div className="dropdown__wrapper">
                <select
                    onChange={(e) => checkInput(e)}
                    className="input dropdown-list"
                    required={props.required}
                >
                    <option>Select One</option>
                    {listItems}
                </select>
            </div>
        );
    } else {
        input = (
            <input
                onChange={(e) => checkInput(e)}
                className="input"
                type={props.type}
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
