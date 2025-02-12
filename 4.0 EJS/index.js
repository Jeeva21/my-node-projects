import express from "express";
import ejs from "ejs";
const app = express();
const port = 3000;

app.get("/",(req, res)=>{
    const today = new Date();
    const day = today.getDay();

    console.log(day)
    let type = "weekday";
    let adv = "it's time to work hard!";

    if(day === 0 || day === 6){
        type = "weekend";
        adv = "it's time to have fun!";
    }

    res.render("index.ejs", {dayType:type, dayAdv:adv});
    console.log(day);
});

app.listen(port,()=>{
    console.log(`Server Running Port ${port}`);
});











//My Own Style
// const d = new Date();
// let day = d.getDay();

// app.get("/",(req, res)=>{
//     res.render("index.ejs", {theDay:day});
//     console.log(day);
// });
