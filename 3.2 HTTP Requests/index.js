import express from "express";
const app = express();
const port=3000;

app.get("/",(req, res)=>{
    // console.log(req);
    res.send("<h1>Hey Jeevanandam</h1>");
});

app.get("/about-us", (req, res)=>{
    res.send("<h1>About Us</h1>");
});

app.get("/contact", (req, res)=>{
    res.send("<h1>Contact Us</h1><br/>Phone: +91 8080808080")
})

app.listen(port,()=>{
    console.log(`Server is working on Port: ${port}!`);
});