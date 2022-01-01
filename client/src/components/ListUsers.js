import React, {Fragment, useEffect, useState} from "react";
import emailjs from '@emailjs/browser';
import EditUser from "./EditUser";


const ListUsers = () => {
    const [users, setUsers] = useState([]);

    const deleteTodo = async(id) => {
        try{
            const response = await fetch(`http://localhost:5000/user/${id}`, {
                method: "DELETE"
            }); //quationu farklı
            console.log(response);
            setUsers(users.filter(user => user.id !== id));
            window.location = "/";
        }catch(err){
            console.log(err.message);
        }
    };

    const getUsers = async() => {
        try{
            const response = await fetch("http://localhost:5000/users");
            const jsonData = await response.json();
            console.log(jsonData);
            setUsers(jsonData);
        }catch(err){
            console.log(err.message);
        }
    };

    //Unchecks if the button is checked
    function checkRatioButtons(e)
     {
       if(document.getElementById(e).previous == true){
            document.getElementById(e).checked = false;
        }
        document.getElementById(e).previous = document.getElementById(e).checked;
        

    }


    function sendEmail()
    {
        var flag = 0;
        var d = document.getElementsByClassName('radio');
        var text = document.getElementById("textArea").value;
        for (var i = 0; i < d.length; i++) {
            if (d[i].checked) {   
                const currentTime = new Date();
                var email = document.getElementById('e' + d[i].id.substring(1)).innerText;   
                console.log(email);   
                console.log(currentTime);
                var paramters = {
                    from_name: 'test.case.user.2021@gmail.com',
                    to_name: email,
                    message: text,
                    link: 'http://localhost:5000/mail/' + d[i].id.substring(1) + 't' + currentTime.getTime()
                }
            emailjs.init("user_v8fwHkosuULJa2eRxfW8p");
            emailjs.send('service_zjwpf91', 'template_fa5e7de', paramters).then(function(res){ flag = 1;})
            

        }

    };

        alert("E-mail is sent");

  
      
        return;
    }

     



    useEffect(() => {
        getUsers();
    }, []);


    return (<Fragment>
        <table class="table mt-5 text-center">
            <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Campaign</th>
                <th>Duration (minutes)</th>
            </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key = {user.id}>
                        <td>{user.name}</td>
                        <td >{user.surname}</td>
                        <td id = {'e'+user.id} >{user.email}</td>
                        <td>{user.campaign}</td>
                        <td>{user.duration}</td>
                        <td>< input type="radio" class="radio" id={'r' + user.id} onClick={() => checkRatioButtons('r' + user.id)}/></td>
                        <td>
                            <EditUser user ={user}/>
                        </td>
                        <td>
                            <button className= "btn btn-danger" onClick={() => deleteTodo(user.id)}>Delete</button>
                        </td>
                    </tr>
 
                ))}
                <div class="text-left">
                <h4 for="story">  </h4>
                    <h4 for="story">Write your message:</h4>
                    <textarea id="textArea" name="textArea" rows="5" cols="33">
                    </textarea>
                </div>    
                <div class="text-left mt-5">
                     <button className= "btn btn-primary" onClick={() => sendEmail()}>Send E-mail</button>
                </div>                     
            </tbody>
        </table>
    </Fragment>
    );
};
export default ListUsers;