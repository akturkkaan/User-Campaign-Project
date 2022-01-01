import React, {Fragment, useState} from "react";


const InputCampaign = () => {
    const[campaignName, setCampaignName] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try{
            const body = {campaignName};
            const response = await fetch("http://localhost:5000/campaign", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
            console.log(response);
        }catch(err){
            console.error(err.message)
        }
    };

    return(
    <Fragment>
        <h1 className="text-center bg-success text-white mt-5">Campaigns</h1>
        <form className="d-flex mt-5" onSubmit = {onSubmitForm}>
            <input
                type= "text"
                className="form-control"
                value={campaignName}
                onChange = {e => setCampaignName(e.target.value)}/>
                <button className = "btn btn-success">Add Campaign</button>
        </form>
    </Fragment>
    );
    
};

export default InputCampaign;