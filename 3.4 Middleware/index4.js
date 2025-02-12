import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({extended:true}));

function bandNameGenerator(req, res, next){
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}

app.use(bandNameGenerator);

app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res)=>{
  // console.log("Street Name: " + req.body.street);
  // console.log("Pet Name: " + req.body.pet);
  // console.log(req.body);
  // res.send("<h1>Your Band Name Is:</h1>" + "<br/>" + "<h2>" + req.body.street + "" +req.body.pet + "💪 </h2>");
  res.send(`<h1>Your Band Name Is:</h1><h2> ${bandName}💪</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
