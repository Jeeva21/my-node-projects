//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
var userIsAuthorised = false;

//Middleware
app.use(bodyParser.urlencoded({extended:true}));

function passwordCheck(req, res, next){
    var password = req.body["password"];
    if (password === "ILoveProgramming"){
        userIsAuthorised = true;
    }
    next();
}

app.use(passwordCheck);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res)=>{
    console.log(req.body.password);
    // var password = req.body["password"];
    // if (password === "ILoveProgramming"){
    //     res.sendFile(__dirname + "/public/secret.html");
    //     console.log("Success!!!")
    // }else{
    //     // res.send("The Password you entered is wrong!!! Please try again later");
    //     console.log("The Password you entered is wrong!!! Please try again later")
    //     res.sendFile(__dirname + "/public/index.html");
    // }
    if(userIsAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
        console.log("Success!!!")
    }else{
        res.sendFile(__dirname + "/public/index.html");
        console.log("The Password you entered is wrong!!! Please try again later");
    }
});

app.listen(port, ()=>{
    console.log(`Server Running Port ${port}`);
});
