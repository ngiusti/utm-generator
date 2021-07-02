import React from "react";

export default function CustomInput(props) {
    let input;
    if (props.type === "dropdown") {
        input = (
            <select className="input">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
        );
    } else {
        input = <input className="input" />;
    }
    return (
        <div className="input__wrap">
            <h3 className="input-header">{props.label}</h3>
            {input}
        </div>
    );
}
