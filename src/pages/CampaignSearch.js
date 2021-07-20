import React, { Component } from "react";

import CustomInput from "../components/CustomInput";

import { firestore } from "../firebase/firebase.utilz";

var campaignRef = firestore.collection("data").doc("iGtGunKCe4CflMrQ5QRQ").collection("campaigns");

export default class CampaignSearch extends Component {
    constructor() {
        super();
        this.state = {
            campaignList: [],
        };
    }

    componentDidMount() {
        campaignRef.get().then((querySnapshot) => {
            var list = [];
            querySnapshot.forEach((doc) => {
                list.push(doc.data());
                this.setState({
                    campaignList: list,
                });
            });
        });
    }

    showDetails(e) {
        e.target.nextSibling.classList.toggle("is-visable");
    }

    render() {
        let campaignList;
        campaignList = this.state.campaignList
            .sort((a, b) => (a.fiscal > b.fiscal ? 1 : -1))
            .reverse()
            .map((element, i) => {
                return (
                    <div key={i} className="url__wrap">
                        <h3 className={("generated-content", "toggle-content")} onClick={(e) => this.showDetails(e)}>
                            <span className="tag-copy">Campaign Tag:</span> {element.campaignTag}
                        </h3>
                        <div className="campaign-details__wrap">
                            <h3 className="generated-content">
                                <span className="tag-copy">Campaign Theme:</span> {element.campaignTheme}
                            </h3>
                            <h3 className="generated-content">
                                <span className="tag-copy">Campaign Type: </span>
                                {element.campaignType}
                            </h3>
                            <h3 className="generated-content">
                                <span className="tag-copy">Fiscal:</span> {element.fiscal}
                            </h3>
                            <h3 className="generated-content">
                                <span className="tag-copy">Region:</span> {element.region}
                            </h3>
                            <h3 className="generated-content">
                                <span className="tag-copy">Parent Camapaign:</span> {element.parentCampaign}
                            </h3>
                            <h3 className="generated-content">
                                <span className="tag-copy">Campaign Cost:</span> {element.cost}
                            </h3>
                            <h3 className="generated-content">
                                <span className="tag-copy">Duration: </span>
                                {element.startDate} - {element.endDate}
                            </h3>
                            <h3 className="generated-content">
                                <span className="tag-copy">Status:</span> {element.status}
                            </h3>
                        </div>
                    </div>
                );
            });
        return (
            <div>
                <h1 className="tab-header">Campaign Search</h1>
                <p className="tab-subheader">Click on Campaign Tag to get extra information</p>
                <div>{campaignList}</div>
            </div>
        );
    }
}
