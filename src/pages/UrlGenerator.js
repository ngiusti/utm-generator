import React, { Component } from "react";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

import { firestore } from "../firebase/firebase.utilz";
import firebase from "../firebase/firebase.utilz";

var ref = firestore.collection("data").doc("iGtGunKCe4CflMrQ5QRQ").collection("emails");

var campaignRef = firestore.collection("data").doc("iGtGunKCe4CflMrQ5QRQ").collection("campaigns");

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
            email: "",
            url: "",
            leadSourceItem: "",
            mediumItem: "",
            sourceItem: "",
            term: "",
            campaign: "",
            content: "",
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
                if (new Date().getTime() < new Date(doc.data().endDate).getTime()) {
                    list.push(doc.data().campaignTag);
                    this.setState({
                        campaignList: list,
                    });
                }
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

    copyValue() {
        var copyText = document.getElementById("copy-input__wrap").querySelector("input");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }

    utmGeneration() {
        var testVal = "";
        const { url, leadSourceItem, mediumItem, sourceItem, campaign, content, term } = this.state;
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

    buttonEnable() {
        if (
            this.state.email !== "" &&
            this.state.url !== "" &&
            this.state.leadSourceItem !== "" &&
            this.state.mediumItem !== "" &&
            this.state.sourceItem !== "" &&
            this.state.campaign !== ""
        ) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        let pageContent;
        if (this.state.generate) {
            pageContent = (
                <div className="generated__wrap">
                    <h2 className="generated-header">Success!</h2>
                    <div className="copy-input__wraper" id="copy-input__wrap">
                        <CustomInput label="Created UTM" readOnly={true} type="text" value={this.state.utmValue} />
                        <CustomButton copy="COPY" buttonFunc={(e) => this.copyValue(e)} />
                    </div>
                    <h3 className="generated-content">Your Medallia Email: {this.state.email}</h3>
                    <h3 className="generated-content">URL: {this.state.url}</h3>
                    <h3 className="generated-content">Lead Source: {this.state.leadSourceItem}</h3>
                    <h3 className="generated-content">Medium: {this.state.mediumItem}</h3>
                    <h3 className="generated-content">Source: {this.state.sourceItem}</h3>
                    <h3 className="generated-content">Term: {this.state.term}</h3>
                    <h3 className="generated-content">Campaign: {this.state.campaign}</h3>
                    <h3 className="generated-content">Content: {this.state.content}</h3>
                    <CustomButton copy="Generate Another URL" buttonFunc={(e) => this.generateUrl(e)} />
                </div>
            );
        } else {
            pageContent = (
                <form>
                    <div className="input-container">
                        <CustomInput
                            label="Your Email"
                            tag="email"
                            info="Enter your email address"
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            tag="leadSourceItem"
                            label="Lead Source"
                            type="dropdown"
                            info="Select the Lead Source closest to your campaign type"
                            valueFunc={this.setValues}
                            data={this.state.leadSource}
                            required={true}
                        />
                        <CustomInput
                            label="Landing Page URL"
                            tag="url"
                            info="Enter your Landing Page URL associated to this campaign"
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
                            info="This field should contain the name of your effort. Do not use spaces, periods or dashes. Underscores are allowed."
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
                            info="Select the medium for this URL"
                            valueFunc={this.setValues}
                            data={this.state.medium}
                            required={true}
                        />
                        <CustomInput
                            label="Source"
                            tag="sourceItem"
                            type="dropdown"
                            info="Select the Source for this URL"
                            valueFunc={this.setValues}
                            data={this.state.source}
                            required={true}
                        />
                        <CustomInput
                            label="Content (optional)"
                            tag="content"
                            info="Enter content values to define testing or messaging"
                            valueFunc={this.setValues}
                        />
                        <CustomInput
                            label="Term (optional)"
                            tag="term"
                            info="Enter term values for tracking paid campaigns"
                            valueFunc={this.setValues}
                        />
                    </div>
                    <CustomButton
                        copy="Generate URL"
                        buttonFunc={(e) => this.generateUrl(e)}
                        type="submit"
                        disabled={this.buttonEnable()}
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
