import React, { Component } from "react";

export default class DropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            value: "",
        };
    }

    addToList() {
        this.props.updateFunc(this.state.value, this.props.tag);
        this.setState((prevState) => ({
            value: "",
        }));
    }

    removeFromList(event) {
        this.props.removeFunc(
            event.target.previousSibling.innerText,
            this.props.tag
        );
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({
            value: value,
        });
    };

    componentDidUpdate() {
        if (this.state.list !== this.props.list) {
            this.setState({
                list: this.props.list,
            });
        }
    }

    render() {
        return (
            <div className="admin__container">
                <h2 className="section-header">{this.props.header}</h2>
                {this.state.list.map((value, i) => {
                    return (
                        <div key={value} className="admin-value__wrap">
                            <h3 className="admin-value">{value}</h3>
                            <h3
                                className="admin-value-remove"
                                onClick={(e) => this.removeFromList(e)}
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
                    <button
                        onClick={() => this.addToList()}
                        disabled={this.state.value.length < 1}
                    >
                        Add new value
                    </button>
                </div>
            </div>
        );
    }
}
