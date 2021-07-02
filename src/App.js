import "./App.css";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";

import Admin from "./pages/Admin";
import MyUrls from "./pages/MyUrls";
import Salesforce from "./pages/Salesforce";
import UrlGenerator from "./pages/UrlGenerator";

import "./main.styles.scss";

function App() {
  return (
    <div>
      <div className="header__wrap">
        <h1 className="header">Medallia UTM Generator</h1>
      </div>
      <div className="tabs__wrap">
        <Tabs>
          <TabList>
            <Tab>UTM Generator</Tab>
            <Tab>My URLS</Tab>
            <Tab>SalesForce</Tab>
            <Tab>Admin</Tab>
          </TabList>

          <TabPanel>
            <UrlGenerator />
          </TabPanel>
          <TabPanel>
            <MyUrls />
          </TabPanel>
          <TabPanel>
            <Salesforce />
          </TabPanel>
          <TabPanel>
            <Admin />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
