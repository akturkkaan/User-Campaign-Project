import React, {Fragment, useState} from "react";

const EditUser = ({user}) => {


    const editUser = async(id) => {

        //Getting valurs of inputs fields of edit modal
        var name = document.getElementById("u" + id).value; 
        var surname = document.getElementById("s" + id).value; 
        var email = document.getElementById("m" + id).value; 

        //If user name value is set
        if (name.length > 0)
        { 

            var obj = new Object();
            obj.name = name;
            var jObj = JSON.stringify(obj);

            try{
                const response =  await fetch(`http://localhost:5000/userName/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': jObj.length
                        },
                    body: jObj  
                }); //quationu farklı
            }catch(err){
                console.log(err.message);
            }
        }
        //If user surname value is set
        if (surname.length > 0)
        { 
            var obj = new Object();
            obj.surname = surname;
            var jObj = JSON.stringify(obj);
            try{
                const response =  await fetch(`http://localhost:5000/userSurname/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': jObj.length
                        },
                    body: jObj  
                }); //quationu farklı
            }catch(err){
                console.log(err.message);
            }	
        }  

        //If user email value is set
        if (email.length > 0)
        { 
            var obj = new Object();
            obj.email = email;
            var jObj = JSON.stringify(obj);
            try{
                const response =  await fetch(`http://localhost:5000/userMail/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': jObj.length
                        },
                    body: jObj  
                }); //quationu farklı
                
            }catch(err){
                console.log(err.message);
            }


        }  
        window.location = "/";
    };

    return (
        <Fragment>
                     <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#id${user.id}`}>
                                Edit
                            </button>
                            <div class="modal" id={`id${user.id}`}>
                                <div class="modal-dialog">
                                <div class="modal-content">
                                
                                    <div class="modal-header">
                                    <h4 class="modal-title">Edit User</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    
                                    <div class="modal-body">
                                        <div><input type="text" id={`u${user.id}`} placeholder="Enter Name"/></div>
                                        <div><input type="text" id={`s${user.id}`} placeholder="Enter Surname"/></div>
                                        <div><input type="text" id={`m${user.id}`} placeholder="Enter E-mail"/></div>
                                    </div>
                                    
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => editUser(user.id)}>Edit</button>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
        </Fragment>
    );
};
export default EditUser;