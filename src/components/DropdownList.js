import React, { Component } from "react";

export default class DropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list,
            value: "",
        };
    }

    addToList() {
        this.setState((prevState) => ({
            list: [...prevState.list, this.state.value],
            value: "",
        }));
    }

    removeFromList(id) {
        this.setState((prevState) => ({
            list: prevState.list.filter((el) => el !== id),
        }));
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <div class="admin__container">
                <h2 className="section-header">{this.props.header}</h2>
                {this.state.list.map((value, i) => {
                    return (
                        <div key={value} className="admin-value__wrap">
                            <h3 className="admin-value">{value}</h3>
                            <h3
                                className="admin-value-remove"
                                onClick={() => this.removeFromList(value)}
                            >
                                X
                            </h3>
                        </div>
                    );
                })}
                <div className="admin-input__wrap">
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <button onClick={() => this.addToList()}>
                        Add new value
                    </button>
                </div>
            </div>
        );
    }
}
