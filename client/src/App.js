import React, {Fragment} from "react";
import './App.css';

//Components
import InputUser from "./components/InputUser";
import ListUsers from "./components/ListUsers";
import InputCampaign from "./components/InputCampaign";
import ListCampaigns from "./components/ListCampaigns";



function App() {
  return (
    <Fragment>
      <div className="container">
        <InputUser/>
        <ListUsers/>
        <InputCampaign/>
        <ListCampaigns/>
      </div>
        
    </Fragment>
  );
}

export default App;
