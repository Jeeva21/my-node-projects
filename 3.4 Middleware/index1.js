import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

//Middleware using "".use" method, and it need to called before any of the route handlers 
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
  console.log(__dirname + "/public/index.html")
});

app.post("/submit", (req, res) => {
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
