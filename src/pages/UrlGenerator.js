import React, { Component } from "react";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

import { firestore } from "../firebase/firebase.utilz";
import firebase from "../firebase/firebase.utilz";

var ref = firestore
    .collection("data")
    .doc("iGtGunKCe4CflMrQ5QRQ")
    .collection("emails");

var campaignRef = firestore
    .collection("data")
    .doc("iGtGunKCe4CflMrQ5QRQ")
    .collection("campaigns");

export default class UrlGenerator extends Component {
    constructor() {
        super();
        this.state = {
            leadSource: [],
            source: [],
            medium: [],
            campaignList: [],
            generate: false,
            utmValue: "",
        };
    }

    componentDidMount() {
        firestore
            .collection("data")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        leadSource: doc.data().leadSource,
                        source: doc.data().source,
                        medium: doc.data().medium,
                    });
                });
            });
        campaignRef.get().then((querySnapshot) => {
            var list = [];
            querySnapshot.forEach((doc) => {
                list.push(doc.data().campaignTag);
                this.setState({
                    campaignList: list,
                });
            });
        });
    }

    updateList() {
        ref.doc(this.state.email).update({
            utm: firebase.firestore.FieldValue.arrayUnion({
                url: this.state.utmValue,
                campaign: this.state.campaign,
                source: this.state.sourceItem,
            }),
        });
    }

    generateUrl(event) {
        this.setState({
            generate: !this.state.generate,
        });
        if (this.state.generate === true) {
            this.setState({
                email: "",
                url: "",
                leadSourceItem: "",
                mediumItem: "",
                sourceItem: "",
                term: "",
                campaign: "",
                content: "",
            });
        } else {
            this.utmGeneration();
        }
    }

    utmGeneration() {
        var testVal = "";
        const {
            url,
            leadSourceItem,
            mediumItem,
            sourceItem,
            campaign,
            content,
            term,
        } = this.state;
        if (url) {
            testVal += url;
        }
        if (leadSourceItem) {
            testVal += "?source=" + this.formateString(leadSourceItem);
        }
        if (campaign) {
            testVal += "&utm_campaign=" + this.formateString(campaign);
        }
        if (sourceItem) {
            testVal += "&utm_source=" + this.formateString(sourceItem);
        }
        if (mediumItem) {
            testVal += "&utm_medium=" + this.formateString(mediumItem);
        }
        if (content) {
            testVal += "&utm_content=" + this.formateString(content);
        }
        if (term) {
            testVal += "&utm_term=" + this.formateString(term);
        }
        this.setState(
            {
                utmValue: testVal,
            },
            this.updateList
        );
    }

    formateString(str) {
        let fString = str.replace(" ", "%20");
        return fString;
    }

    setValues = (tag, value) => {
        this.setState({ [tag]: value });
    };

    render() {
        let pageContent;
        if (this.state.generate) {
            pageContent = (
                <div>
                    <h2>Generated</h2>
                    <div>
                        <h2>Created UTM</h2>
                        <h3 className="utm-value">{this.state.utmValue}</h3>
                    </div>
                    <h3>Email: {this.state.email}</h3>
                    <h3>URL: {this.state.url}</h3>
                    <h3>Lead Source: {this.state.leadSourceItem}</h3>
                    <h3>Medium: {this.state.mediumItem}</h3>
                    <h3>Source: {this.state.sourceItem}</h3>
                    <h3>Term: {this.state.term}</h3>
                    <h3>Campaign: {this.state.campaign}</h3>
                    <h3>Content: {this.state.content}</h3>
                    <CustomButton
                        copy="Generate Another URL"
                        buttonFunc={(e) => this.generateUrl(e)}
                    />
                </div>
            );
        } else {
            pageContent = (
                <form>
                    <div className="input-container">
                        <CustomInput
                            label="Your Email"
                            tag="email"
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            tag="leadSourceItem"
                            label="Lead Source"
                            type="dropdown"
                            valueFunc={this.setValues}
                            data={this.state.leadSource}
                            required={true}
                        />
                        <CustomInput
                            label="Landing Page URL"
                            tag="url"
                            valueFunc={this.setValues}
                            required={true}
                        />
                    </div>
                    <h2 className="section-header">Campagin</h2>
                    <div className="input-container">
                        <CustomInput
                            label="Campaign"
                            tag="campaign"
                            type="dropdown"
                            valueFunc={this.setValues}
                            data={this.state.campaignList}
                            required={true}
                        />
                    </div>
                    <h2 className="section-header">Other UTM Parameters</h2>
                    <div className="input-container">
                        <CustomInput
                            label="Medium"
                            tag="mediumItem"
                            type="dropdown"
                            valueFunc={this.setValues}
                            data={this.state.medium}
                            required={true}
                        />
                        <CustomInput
                            label="Source"
                            tag="sourceItem"
                            type="dropdown"
                            valueFunc={this.setValues}
                            data={this.state.source}
                            required={true}
                        />
                        <CustomInput
                            label="Content (optional)"
                            tag="content"
                            valueFunc={this.setValues}
                        />
                        <CustomInput
                            label="Term (optional)"
                            tag="term"
                            valueFunc={this.setValues}
                        />
                    </div>
                    <CustomButton
                        copy="Generate URL"
                        buttonFunc={(e) => this.generateUrl(e)}
                        type="submit"
                    />
                </form>
            );
        }

        return (
            <div className="url-generator__container page__container">
                <h1 className="tab-header">Tracking URL Generator</h1>
                {pageContent}
            </div>
        );
    }
}
