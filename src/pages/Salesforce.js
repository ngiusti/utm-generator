import React, { Component } from "react";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { firestore } from "../firebase/firebase.utilz";

var ref = firestore
    .collection("data")
    .doc("iGtGunKCe4CflMrQ5QRQ")
    .collection("campaigns");

var campaignRef = firestore
    .collection("data")
    .doc("iGtGunKCe4CflMrQ5QRQ")
    .collection("campaigns");

export default class Salesforce extends Component {
    constructor() {
        super();
        this.state = {
            fiscalData: [],
            regionData: [],
            campaignThemeData: [],
            campaignTypeData: [],
            statusData: [],
            generate: false,
            campaignTag: "",
            cost: "",
            startDate: "",
            endDate: "",
            parentCampaignData: [],
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
        this.campaignGeneration();
        this.setState({
            generate: !this.state.generate,
        });
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
        const { fiscal, region, campaignTheme, campaignType, freeFormText } =
            this.state;
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
            active:
                new Date().getTime() < new Date(this.state.endDate).getTime()
                    ? true
                    : false,
        });
    }

    render() {
        let pageContent;
        if (this.state.generate) {
            pageContent = (
                <div>
                    <h2>Generated</h2>
                    <div>
                        <h2>Created Campaign</h2>
                    </div>
                    <div>{this.state.campaignTag}</div>
                    <div>
                        <div>{this.state.email}</div>
                        <div>{this.state.fiscal}</div>
                        <div>{this.state.region}</div>
                        <div>{this.state.campaignTheme}</div>
                        <div>{this.state.freeFormText}</div>
                        <div>{this.state.campaignType}</div>
                        <div>${this.state.cost}</div>
                        <div>
                            {this.state.startDate} - {this.state.endDate}
                        </div>
                        <div>{this.state.parentCampaign}</div>
                    </div>
                    <CustomButton
                        copy="Generate Another Campaign"
                        buttonFunc={(e) => this.generateUrl(e)}
                    />
                </div>
            );
        } else {
            pageContent = (
                <form>
                    <div className="input-container">
                        <CustomInput
                            label="Your Medallia Email"
                            tag="email"
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            label="Fiscal Year/Quarter"
                            tag="fiscal"
                            valueFunc={this.setValues}
                            data={this.state.fiscalData}
                            type="dropdown"
                            required={true}
                        />
                        <CustomInput
                            label="Region"
                            tag="region"
                            valueFunc={this.setValues}
                            data={this.state.regionData}
                            type="dropdown"
                            required={true}
                        />
                        <CustomInput
                            label="Campaign Theme"
                            tag="campaignTheme"
                            valueFunc={this.setValues}
                            data={this.state.campaignThemeData}
                            type="dropdown"
                            required={true}
                        />
                        <CustomInput
                            label="Free Form Text"
                            tag="freeFormText"
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            label="Campaign Type"
                            tag="campaignType"
                            valueFunc={this.setValues}
                            data={this.state.campaignTypeData}
                            type="dropdown"
                            required={true}
                        />
                        <CustomInput
                            label="Actual Cost"
                            tag="cost"
                            type="number"
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            label="Start Date"
                            tag="startDate"
                            type="date"
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            label="End Date"
                            tag="endDate"
                            type="date"
                            valueFunc={this.setValues}
                            required={true}
                        />
                        <CustomInput
                            label="Parent Campaign"
                            tag="parentCampaign"
                            type="dropdown"
                            valueFunc={this.setValues}
                            data={this.state.parentCampaignData}
                            required={true}
                        />
                        <CustomInput
                            label="Status"
                            tag="status"
                            type="dropdown"
                            valueFunc={this.setValues}
                            data={this.state.statusData}
                            required={true}
                        />
                    </div>
                    <CustomButton
                        copy="Generate Campaign"
                        buttonFunc={(e) => this.generateUrl(e)}
                        type="submit"
                    />
                </form>
            );
        }
        return (
            <div className="page__container">
                <h1 className="tab-header">
                    Salesforce Campaign Name Generator
                </h1>
                {pageContent}
            </div>
        );
    }
}
