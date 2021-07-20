import React, { Component } from "react";

import DropdownList from "../components/DropdownList";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { firestore } from "../firebase/firebase.utilz";
import firebase from "../firebase/firebase.utilz";

var ref = firestore.collection("data").doc("iGtGunKCe4CflMrQ5QRQ");

export default class Admin extends Component {
    constructor() {
        super();
        this.state = {
            password: "",
            passwordCheck: "",
            validation: false,
            leadSource: [],
            source: [],
            medium: [],
            fiscal: [],
            region: [],
            campaignTheme: [],
            campaignType: [],
            status: [],
        };
    }

    componentDidMount() {
        this.firebaseData();
    }

    firebaseData() {
        firestore
            .collection("data")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        leadSource: doc.data().leadSource,
                        source: doc.data().source,
                        medium: doc.data().medium,
                        fiscal: doc.data().fiscal,
                        region: doc.data().region,
                        campaignTheme: doc.data().campaignTheme,
                        campaignType: doc.data().campaignType,
                        status: doc.data().status,
                        passwordCheck: doc.data().password,
                    });
                });
            });
    }

    updateList(text, tag) {
        ref.update({
            [tag]: firebase.firestore.FieldValue.arrayUnion(text),
        }).then(this.firebaseData.bind(this));
    }

    removeFromList(text, tag) {
        ref.update({
            [tag]: firebase.firestore.FieldValue.arrayRemove(text),
        }).then(this.firebaseData.bind(this));
    }

    setValues = (tag, value) => {
        this.setState({ [tag]: value });
    };

    checkPassword() {
        if (this.state.password === this.state.passwordCheck) {
            this.setState({ validation: true });
        }
    }

    render() {
        let pageContent;
        if (this.state.validation) {
            pageContent = (
                <div className="admin-list__wrap">
                    <DropdownList
                        header="Lead Source"
                        tag="leadSource"
                        list={this.state.leadSource}
                        updateFunc={this.updateList.bind(this)}
                        removeFunc={this.removeFromList.bind(this)}
                    />
                    <DropdownList
                        header="Medium"
                        tag="medium"
                        list={this.state.medium}
                        updateFunc={this.updateList.bind(this)}
                        removeFunc={this.removeFromList.bind(this)}
                    />
                    <DropdownList
                        header="Source"
                        tag="source"
                        list={this.state.source}
                        updateFunc={this.updateList.bind(this)}
                        removeFunc={this.removeFromList.bind(this)}
                    />
                    <DropdownList
                        header="Fiscal Year/Quarter"
                        tag="fiscal"
                        list={this.state.fiscal}
                        updateFunc={this.updateList.bind(this)}
                        removeFunc={this.removeFromList.bind(this)}
                    />
                    <DropdownList
                        header="Region"
                        tag="region"
                        list={this.state.region}
                        updateFunc={this.updateList.bind(this)}
                        removeFunc={this.removeFromList.bind(this)}
                    />
                    <DropdownList
                        header="Campaign Theme"
                        tag="campaignTheme"
                        list={this.state.campaignTheme}
                        updateFunc={this.updateList.bind(this)}
                        removeFunc={this.removeFromList.bind(this)}
                    />
                    <DropdownList
                        header="Campaign Type"
                        tag="campaignType"
                        list={this.state.campaignType}
                        updateFunc={this.updateList.bind(this)}
                        removeFunc={this.removeFromList.bind(this)}
                    />
                    <DropdownList
                        header="Status"
                        tag="status"
                        list={this.state.status}
                        updateFunc={this.updateList.bind(this)}
                        removeFunc={this.removeFromList.bind(this)}
                    />
                </div>
            );
        } else {
            pageContent = (
                <div>
                    <CustomInput
                        label="Admin Password"
                        type="text"
                        tag="password"
                        valueFunc={this.setValues}
                    />
                </div>
            );
        }

        return (
            <div className="page__container">
                <h2 className="tab-header">Content Admin</h2>
                {pageContent}
                <CustomButton
                    copy="Submit"
                    buttonFunc={(e) => this.checkPassword(e)}
                    type="submit"
                />
            </div>
        );
    }
}
