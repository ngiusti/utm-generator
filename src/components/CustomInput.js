import React from "react";

export default function CustomInput(props) {
    const id = "info-modal-" + props.label;
    function checkInput(e) {
        props.valueFunc(props.tag, e.target.value);
    }

    function showModal() {
        document.getElementById(id).style.display = "block";
    }

    function hideModal() {
        document.getElementById(id).style.display = "none";
    }

    let input, icon;

    if (props.type === "dropdown") {
        const listItems = props.data
            .sort((a, b) => (a > b ? 1 : -1))
            .map((el, index) => (
                <option key={index} value={el}>
                    {el}
                </option>
            ));
        input = (
            <div className="dropdown__wrapper">
                <select onChange={(e) => checkInput(e)} className="input dropdown-list" required={props.required}>
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

    if (props.info) {
        icon = (
            <span className="info-icon" onMouseEnter={() => showModal()} onMouseLeave={() => hideModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="#4050c6">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z" />
                </svg>
            </span>
        );
    }

    return (
        <div className="input__wrap">
            <h3 className="input-header">
                {props.label}
                {icon}
            </h3>
            {input}
            <div className="info-modal" id={id}>
                <div className="triangle"></div>
                <p>{props.info}</p>
            </div>
        </div>
    );
}
