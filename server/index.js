const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db"); 


//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routues//


//Add a user
app.post("/user", async(req, res) => {
    try{
        const obj = JSON.stringify(req.body);
        var parsed = JSON.parse(obj); 
        
        let sql = "INSERT INTO Users(name,surname,email) VALUES (?,?,?)";
        const user = await connection.query(sql, [parsed['name'],parsed['surname'], parsed['email']]);
            res.json("The user is added");
    }catch(err){
        console.error(err.message);
        res.json("The user could not be added");
    }
});



//Delete a user
app.delete("/user/:id", async(req, res) => {
    try{
        const {id} = req.params;
        let sql = 'DELETE FROM Users WHERE id = ?';
        const allTodos = connection.query(sql, [id] ,(error, result) => {
            if (error)
                throw error;
            res.json("The user is deleted");

        });
    }catch(err){
        console.error(err.message);
        res.json("The user could not be deleted");
    }
});


//Get All Users
app.get("/users", async(req, res) => {
    try{
        let sql = 'SELECT *  FROM Users';
        const allTodos = connection.query(sql, (error, result) => {
            if (error)
                throw error;
            res.json(result);
            console.log(result);
        });
    }catch(err){
        console.error(err.message);
        res.json("Users could not gathered");
    }
});

//Update Duration of a user
app.get("/mail/:id", async(req, res) => {
    try{
        var id = req.params.id;
        id = id.split("t");
        const currentTime = new Date();
        const userEmailReceivedTime = id[1];
        var timeDifference = ((currentTime.getTime() - userEmailReceivedTime) / 1000)/60;
        let sql = 'UPDATE Users SET duration = ? WHERE id = ?';
        const allTodos = connection.query(sql, [String(timeDifference), id[0]] ,(error, result) => {
            if (error)
                throw error;
            res.json("Successfull :)");
        });

    }catch(err){
        console.error(err.message);
    }
});

//Get All Campaigns
app.get("/campaigns", async(req, res) => {
    try{
        let sql = 'SELECT campaignName  FROM Campaigns';
        const allTodos = connection.query(sql, (error, result) => {
            if (error)
                throw error;
            res.json(result);
            console.log(result);
        });
    }catch(err){
        console.error(err.message);
        res.json("Campaigns could not gathered");
    }
});

//Update User Campaign
app.put("/campaign/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const {campaignName} = req.body;
        let sql = 'UPDATE Users SET campaign = ? WHERE id = ?';
        const allTodos = connection.query(sql, [campaignName, id] ,(error, result) => {
            if (error)
                throw error;
            res.json("The campaign updated");
            console.log("The campaign updated");
        });
    }catch(err){
        res.json("The campaign could not be updated");
    }
});

//Update User Name
app.put("/userName/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const {name} = req.body;
        let sql = 'UPDATE Users SET name = ? WHERE id = ?';
        const allTodos = connection.query(sql, [name, id] ,(error, result) => {
            if (error)
                throw error;
            res.json("The name updated");
            console.log("The name updated");
        });
    }catch(err){
        res.json("The name could not be updated");
    }
});

//Update User Surname
app.put("/userSurname/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const {surname} = req.body;
        let sql = 'UPDATE Users SET surname = ? WHERE id = ?';
        const allTodos = connection.query(sql, [surname, id] ,(error, result) => {
            if (error)
                throw error;
            res.json("The surname updated");
            console.log("The surname updated");
        });
    }catch(err){
        res.json("The surname could not be updated");
    }
});

//Update User E-mail
app.put("/userMail/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const {email} = req.body;
        let sql = 'UPDATE Users SET email = ? WHERE id = ?';
        const allTodos = connection.query(sql, [email, id] ,(error, result) => {
            if (error)
                throw error;
            res.json("The email updated");
            console.log("The email updated");
        });
    }catch(err){
        res.json("The email could not be updated");
    }
});


//Add a campaign
app.post("/campaign", async(req, res) => {
    try{
        const obj = JSON.stringify(req.body);
        var parsed = JSON.parse(obj); 
        
        let sql = "INSERT INTO Campaigns (campaignName) VALUES (?)";
        const user = await connection.query(sql, [parsed['campaignName']]);
            res.json("The campaign is added");
    }catch(err){
        console.error(err.message);
        res.json("The campaign could not be added");
    }
});

//Delete Campaign
app.delete("/campaign/:id", async(req, res) => {
    try{
        const {id} = req.params;
        let sql = 'DELETE FROM Campaigns WHERE campaignName = ?;UPDATE Users SET campaign = NULL WHERE campaign = ?;';
        const allTodos = connection.query(sql, [id,id] ,(error, result,field) => {
            if (error)
                throw error;
                res.json("The campaign is deleted");
        });
    }catch(err){
        console.error(err.message);
        res.json("The campaign could not be deleted");
    }
});


app.listen(5000, () => {
    console.log("Server has started on port 5000");
});  