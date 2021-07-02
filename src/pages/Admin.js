import React, { Component } from "react";

import DropdownList from "../components/DropdownList";

export default class Admin extends Component {
    render() {
        let values = ["stuff", "thing", "other"];
        return (
            <div>
                <h2 className="tab-header">Content Admin</h2>
                <div class="admin-list__wrap">
                    <DropdownList header="Lead Source" list={values} />
                    <DropdownList header="Medium" list={values} />
                    <DropdownList header="Source" list={values} />
                </div>
            </div>
        );
    }
}
