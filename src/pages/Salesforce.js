import React, { Component } from "react";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { firestore } from "../firebase/firebase.utilz";

var ref = firestore.collection("data").doc("iGtGunKCe4CflMrQ5QRQ").collection("campaigns");

var campaignRef = firestore.collection("data").doc("iGtGunKCe4CflMrQ5QRQ").collection("campaigns");

export default class Salesforce extends Component {
    constructor() {
        super();
        this.state = {
            fiscalData: [],
            fiscal: "",
            regionData: [],
            region: "",
            campaignThemeData: [],
            campaignTheme: "",
            campaignTypeData: [],
            campaignType: "",
            statusData: [],
            status: "",
            email: "",
            campaignTag: "",
            cost: "",
            startDate: "",
            endDate: "",
            parentCampaignData: [],
            parentCampaign: "",
            freeFormText: "",
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
                        fiscalData: doc.data().fiscal,
                        regionData: doc.data().region,
                        campaignThemeData: doc.data().campaignTheme,
                        campaignTypeData: doc.data().campaignType,
                        statusData: doc.data().status,
                    });
                });
            });
        campaignRef.get().then((querySnapshot) => {
            var list = [];
            querySnapshot.forEach((doc) => {
                list.push(doc.data().campaignTag);
                this.setState({
                    parentCampaignData: list,
                });
            });
        });
    }

    setValues = (tag, value) => {
        this.setState({ [tag]: value });
    };

    generateUrl(event) {
        this.setState({
            generate: !this.state.generate,
        });
        if (this.state.generate === true) {
            this.setState({
                fiscal: "",
                region: "",
                campaignTheme: "",
                campaignType: "",
                status: "",
                email: "",
                campaignTag: "",
                cost: "",
                startDate: "",
                endDate: "",
                parentCampaign: "",
                freeFormText: "",
            });
        } else {
            this.campaignGeneration();
        }
    }

    regionAbv(region) {
        if (region === "Asia-Pacific") {
            return "APAC";
        } else if (region === "Europe, Middle East, Africa") {
            return "EMEA";
        } else if (region === "North America") {
            return "NA";
        } else if (region === "North America - Canada") {
            return "NAC";
        } else if (region === "Global") {
            return "GLBL";
        } else if (region === "Latin America") {
            return "LATAM";
        } else {
            return region;
        }
    }

    campaignGeneration() {
        var testVal = "";
        const { fiscal, region, campaignTheme, campaignType, freeFormText } = this.state;
        if (fiscal) {
            testVal += fiscal;
        }
        if (region) {
            testVal += "_" + this.regionAbv(region);
        }
        if (campaignTheme) {
            testVal += "_" + campaignTheme;
        }
        if (campaignType) {
            testVal += "_" + campaignType;
        }
        if (freeFormText) {
            testVal += "_" + freeFormText.replace(" ", "_");
        }
        this.setState(
            {
                campaignTag: testVal,
            },
            this.updateList
        );
    }

    updateList() {
        if (this.state.parentCampaign === "Select One" || this.state.parentCampaign === "") {
            this.setState({
                parentCampaign: "None",
            });
        }
        ref.doc(this.state.campaignTag).set({
            campaignTag: this.state.campaignTag,
            email: this.state.email,
            fiscal: this.state.fiscal,
            region: this.state.region,
            campaignTheme: this.state.campaignTheme,
            freeFormText: this.state.freeFormText,
            campaignType: this.state.campaignType,
            cost: this.state.cost,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            parentCampaign: this.state.parentCampaign,
            status: this.state.status,
            active: new Date().getTime() < new Date(this.state.endDate).getTime() ? true : false,
        });
    }

    buttonEnable() {
        if (
            this.state.email !== "" &&
            this.state.fiscal !== "" &&
            this.state.region !== "" &&
            this.state.campaignTheme !== "" &&
            this.state.freeFormText !== "" &&
            this.state.campaignType !== "" &&
            this.state.cost !== "" &&
            this.state.startDate !== "" &&
            this.state.endDate !== "" &&
            this.state.status !== ""
        ) {
            return false;
        } else {
            return true;
        }
    }

    copyValue() {
        var copyText = document.getElementById("copy-input__wrap").querySelector("input");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }

    render() {
        let pageContent;
        if (this.state.generate) {
            pageContent = (
                <div className="generated__wrap">
                    <h2 className="generated-header">Success!</h2>
                    <div className="copy-input__wraper" id="copy-input__wrap">
                        <CustomInput label="Created UTM" readOnly={true} type="text" value={this.state.campaignTag} />
                        <CustomButton copy="COPY" buttonFunc={(e) => this.copyValue(e)} />
                    </div>
                    <div>
                        <h3 className="generated-content">Your Medallia Email: {this.state.email}</h3>
                        <h3 className="generated-content">Fiscal: {this.state.fiscal}</h3>
                        <h3 className="generated-content">Region: {this.state.region}</h3>
                        <h3 className="generated-content">Campaign Theme: {this.state.campaignTheme}</h3>
                        <h3 className="generated-content">Free From Text: {this.state.freeFormText}</h3>
                        <h3 className="generated-content">Campaign Type:{this.state.campaignType}</h3>
                        <h3 className="generated-content">Cost: ${this.state.cost}</h3>
                        <h3 className="generated-content">
                            Effective Dates: {this.state.startDate} - {this.state.endDate}
                        </h3>
                        <h3 className="generated-content">Parent Campaign: {this.state.parentCampaign}</h3>
                    </div>
                    <CustomButton copy="Generate Another Campaign" buttonFunc={(e) => this.generateUrl(e)} />
                </div>
            );
        } else {
            pageContent = (
                <form>
                    <div className="input-container">
                        <CustomInput
                            label="Your Medallia Email"
                            tag="email"
                            info="Enter your email address"
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            label="Fiscal Year/Quarter"
                            tag="fiscal"
                            info="Select your Fiscal Year"
                            valueFunc={this.setValues}
                            data={this.state.fiscalData}
                            type="dropdown"
                            required={true}
                        />
                        <CustomInput
                            label="Region"
                            tag="region"
                            info="Select your Region"
                            valueFunc={this.setValues}
                            data={this.state.regionData}
                            type="dropdown"
                            required={true}
                        />
                        <CustomInput
                            label="Campaign Theme"
                            tag="campaignTheme"
                            info="Campaign Theme"
                            valueFunc={this.setValues}
                            data={this.state.campaignThemeData}
                            type="dropdown"
                            required={true}
                        />
                        <CustomInput
                            label="Free Form Text"
                            tag="freeFormText"
                            info="This field should contain the name of your effort. Do not use spaces, periods or dashes. Underscores are allowed."
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            label="Campaign Type"
                            tag="campaignType"
                            info="Enter your Details"
                            valueFunc={this.setValues}
                            data={this.state.campaignTypeData}
                            type="dropdown"
                            required={true}
                        />
                        <CustomInput
                            label="Actual Cost"
                            tag="cost"
                            type="number"
                            info="Enter Campaign Cost"
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            label="Start Date"
                            tag="startDate"
                            type="date"
                            info="Enter Start Date"
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            label="End Date"
                            tag="endDate"
                            type="date"
                            info="Enter End Date"
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            label="Parent Campaign"
                            tag="parentCampaign"
                            type="dropdown"
                            info="Enter Parent Campaign"
                            valueFunc={this.setValues}
                            data={this.state.parentCampaignData}
                        />
                        <CustomInput
                            label="Status"
                            tag="status"
                            type="dropdown"
                            info="Enter Campaign Status"
                            valueFunc={this.setValues}
                            data={this.state.statusData}
                            required={true}
                        />
                    </div>
                    <CustomButton
                        copy="Generate Campaign"
                        buttonFunc={(e) => this.generateUrl(e)}
                        type="submit"
                        disabled={this.buttonEnable()}
                    />
                </form>
            );
        }
        return (
            <div className="page__container">
                <h1 className="tab-header">Salesforce Campaign Name Generator</h1>
                {pageContent}
            </div>
        );
    }
}
