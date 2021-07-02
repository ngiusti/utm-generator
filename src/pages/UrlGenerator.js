import React, { Component } from "react";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

export default class UrlGenerator extends Component {
    render() {
        return (
            <div className="url-generator__container">
                <h1 className="tab-header">Tracking URL Generator</h1>
                <div className="input-container">
                    <CustomInput label="Your Email" />
                    <CustomInput label="Lead Source" type="dropdown" />
                    <CustomInput label="Landing Page URL" />
                </div>
                <h2 className="section-header">
                    Copy and Paste your SFDC Campaign Name Here
                </h2>
                <div className="input-container">
                    <CustomInput label="Free Form Text" />
                </div>
                <h2 className="section-header">Other UTM Parameters</h2>
                <div className="input-container">
                    <CustomInput label="Medium" type="dropdown" />
                    <CustomInput label="Source" type="dropdown" />
                    <CustomInput label="Content (optional)" />
                    <CustomInput label="Term (optional)" />
                </div>
                <CustomButton copy="Generate URL" />
            </div>
        );
    }
}
