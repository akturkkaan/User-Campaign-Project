import React, {Fragment, useState} from "react";

const InputUser = () => {

    const onChangeFileButton = async e => {
        e.preventDefault();
        let files = e.target.files;
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function(progressEvent){    
          var lines = this.result.split(/\r\n|\n/);
          for(var line = 0; line < lines.length; line++){
            var temp = lines[line].substring(0, lines[line].length - 1).split("<");
            var email = temp[1];
            temp[0] = temp[0].substring(0, temp[0].length - 1);
            var lastIndex = temp[0].lastIndexOf(" ");
            var name = temp[0].substring(0, lastIndex);
            var surname = temp[0].split(" ").splice(-1);

            var obj = new Object();
            obj.name = name;
            obj.surname = surname;
            obj.email = email;

            try{
                const response =  fetch("http://localhost:5000/user", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(obj)
                });

            }catch(err){
                console.error(err.message)
            }

          }
          window.location = "/";
        };
        reader.readAsText(file);
    };

    const addUser = async() => {
        try{
            var name = document.getElementById("toName").value; 
            var surname = document.getElementById("toSurname").value; 
            var email = document.getElementById("toEmail").value; 
            if (name.length == 0)
            { 
                alert("Name information is missing");  	
                return; 
            }
            if (surname.length == 0)
            { 
                alert("Surname information is missing");  	
                return; 
            }  
            if (email.length == 0)
            { 
                alert("E-mail information is missing");  	
                return; 
            }    	
            var obj = new Object();
            obj.name = name;
            obj.surname = surname;
            obj.email = email;

            const response =  fetch("http://localhost:5000/user", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            });
            
            
        }catch(err){
            console.log(err.message);
        }
        window.location = "/";
    };

    return(
    <Fragment>
        <h1 className="text-center bg-danger text-white mt-15">Mail Campaign</h1>
        <div  className="text-center-right mt-15">
        <h4>Select a text file to add user</h4>
        <input
          
                type= "file"

                accept= ".txt"
                onChange = {(e) => onChangeFileButton(e)}/>
        </div>
        <h4></h4>
        <body>
            <h4> Enter user information to add user</h4>
            <input className="form-control" type="text " id="toName" placeholder="Enter Name"/>
            <input className="form-control" type="text" id="toSurname" placeholder="Enter Surname"/>
            <input className="form-control" type="text" id="toEmail" placeholder="Enter E-mail"/>
            <h1></h1>
            <button class="btn btn-success" onClick = {() => addUser()}> Add User</button>
            <h1></h1>
        </body>
        
        <h1 className="text-center bg-warning text-white mt-15">User List</h1>
    </Fragment>
    );
    
};

export default InputUser;