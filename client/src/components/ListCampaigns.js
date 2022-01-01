import React, {Fragment, useEffect, useState} from "react";


const ListCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);

    const deleteCampaign = async(id) => {
        var tempID = id;

        try{

            console.log(id);
            const response = await fetch(`http://localhost:5000/campaign/${id}`, {
                method: "DELETE"
            }); //quationu farklı
            console.log(response);
           
        }catch(err){
            console.log(err.message);
        }
        console.log("deleted");
        window.location = "/";
    };


    const getCampaigns = async() => {
        try{
            const response = await fetch("http://localhost:5000/campaigns");
            const jsonData = await response.json();
            console.log(jsonData);
            setCampaigns(jsonData);
            
        }catch(err){
            console.log(err.message);
        }
    };

 
    const addUsersToCampaign = async() =>
    {
        var d = document.getElementsByClassName('radio2');
        var dd = document.getElementsByClassName('radio');
        for (var i = 0; i < d.length; i++) {
            if (d[i].checked) {   
                for (var j = 0; j < dd.length; j++) {
                    if (dd[j].checked) {   
                        var campaignName = document.getElementById('c' + d[i].id.substring(1)).innerText;   
                        var id = dd[j].id.substring(1);   
                        var obj = new Object();
                        obj.campaignName = campaignName;
                        var jObj = JSON.stringify(obj);
                        console.log(JSON.stringify(obj));
                        console.log(id);
                        //console.log(campaignName);
                        try{
                            const response =  await fetch(`http://localhost:5000/campaign/${id}`, {
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Content-Length': jObj.length
                                  },
                                body: jObj  
                            }); //quationu farklı
                            window.location = "/";
                        }catch(err){
                            console.log(err.message);
                        }
                    }
            }
        }
    }
    };



    useEffect(() => {
        getCampaigns();
    }, []);


    return (<Fragment>
        <table class="table mt-5 text-center">
            <thead>
            <tr>
                <th>Campaign Name</th>
            </tr>
            </thead>
            <tbody>
                {campaigns.map(campaign => (
                    <tr key = {campaign.campaignName}>
                        <td  id= {'c'+ campaign.campaignName}>{campaign.campaignName}</td>
                        <td>< input type="radio" class="radio2" name = 'campaignRatio 'id={'c' + campaign.campaignName}/></td>

                        <td>
                            <button className= "btn btn-danger" onClick={() => deleteCampaign(campaign.campaignName)}>Delete</button>
                        </td>
                    </tr>
 
                ))}
                <div class="text-left mt-5">
                     <button className= "btn btn-success" onClick={() => addUsersToCampaign()}>Add user to Campaign</button>
                </div>                
            </tbody>
        </table>
    </Fragment>
    );
};
export default ListCampaigns;