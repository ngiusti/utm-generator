import React, { Component } from "react";

import CustomInput from "../components/CustomInput";

import { firestore } from "../firebase/firebase.utilz";

var ref = firestore
    .collection("data")
    .doc("iGtGunKCe4CflMrQ5QRQ")
    .collection("emails");

export default class MyUrls extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            urls: {},
        };
    }

    getData(email) {
        ref.doc(email)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    this.setState({
                        urls: doc.data(),
                    });
                } else {
                    console.log("No such document!");
                }
            });
    }

    setValues = (tag, value) => {
        this.setState({ [tag]: value });
    };

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({
            email: value,
        });
    };

    render() {
        let urls;
        if (this.state.urls.utm) {
            urls = this.state.urls.utm.map((value, i) => {
                return (
                    <div key={i} className="url__wrap">
                        <div className="url-top__wrap">
                            <CustomInput
                                label="Campaign"
                                readOnly={true}
                                type="text"
                                value={value.campaign}
                            />
                            <CustomInput
                                label="Source"
                                readOnly={true}
                                type="text"
                                value={value.source}
                            />
                        </div>
                        <div className="url-bot__wrap">
                            <CustomInput
                                label="Url"
                                readOnly={true}
                                type="text"
                                value={value.url}
                            />
                        </div>
                    </div>
                );
            });
        }

        return (
            <div>
                <div className="url-heading__wrap">
                    <h1 className="tab-header">My Tracking URLs</h1>
                    <div className="url-heading-search__wrap">
                        <CustomInput
                            label="Your Medallia Email"
                            tag="email"
                            value={this.state.value}
                            onChange={this.handleChange}
                            valueFunc={this.setValues}
                        />
                        <button onClick={() => this.getData(this.state.email)}>
                            Get Urls
                        </button>
                    </div>
                </div>

                <div>{urls}</div>
            </div>
        );
    }
}
