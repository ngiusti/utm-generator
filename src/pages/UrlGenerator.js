import React, { Component } from "react";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

import { firestore } from "../firebase/firebase.utilz";

export default class UrlGenerator extends Component {
    constructor() {
        super();
        this.state = {
            leadSource: [],
            source: [],
            medium: [],
            generate: false,
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
    }

    generateUrl() {
        this.setState({
            generate: !this.state.generate,
        });
        console.log(this.state);
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
                        <h3>
                            {this.state.url}?source={this.state.leadSourceItem}
                            &utm_campaign={this.state.campaign}&utm_source=
                            {this.state.sourceItem}&utm_medium=
                            {this.state.mediumItem}&utm_content=
                            {this.state.content}&utm_term={this.state.term}
                        </h3>
                    </div>
                    <h3>Email: {this.state.email}</h3>
                    <h3>URL: {this.state.url}</h3>
                    <h3>Lead Source: {this.state.leadSourceItem}</h3>
                    <h3>Medium: {this.state.mediumItem}</h3>
                    <h3>Source: {this.state.sourceItem}</h3>
                    <h3>Term: {this.state.term}</h3>
                    <h3>Free Form Text: {this.state.campaign}</h3>
                    <h3>Content: {this.state.content}</h3>
                    <CustomButton
                        copy="Generate Another URL"
                        buttonFunc={() => this.generateUrl()}
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
                            required="required"
                        />
                        <CustomInput
                            tag="leadSourceItem"
                            label="Lead Source"
                            type="dropdown"
                            valueFunc={this.setValues}
                            data={this.state.leadSource}
                            required="required"
                        />
                        <CustomInput
                            label="Landing Page URL"
                            tag="url"
                            valueFunc={this.setValues}
                            required="required"
                        />
                    </div>
                    <h2 className="section-header">
                        Copy and Paste your SFDC Campaign Name Here
                    </h2>
                    <div className="input-container">
                        <CustomInput
                            label="Free Form Text"
                            tag="campaign"
                            valueFunc={this.setValues}
                            required="required"
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
                            required="required"
                        />
                        <CustomInput
                            label="Source"
                            tag="sourceItem"
                            type="dropdown"
                            valueFunc={this.setValues}
                            data={this.state.source}
                            required="required"
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
                        buttonFunc={() => this.generateUrl()}
                        type="submit"
                    />
                </form>
            );
        }

        return (
            <div className="url-generator__container">
                <h1 className="tab-header">Tracking URL Generator</h1>
                {pageContent}
            </div>
        );
    }
}
