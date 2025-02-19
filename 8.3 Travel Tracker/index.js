import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "jeevadb",
  database: "world",
  port: 5432
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT * FROM visited_countries");
  const data = result.rows;
  console.log(data);
  let countries = [];
  data.forEach(country => {
    countries.push(country.country_code);
  });
  res.render("index.ejs", {total:data.length, countries:countries});
  console.log(countries);
});

app.post("/add", async (req, res)=>{
  const countryCode = req.body.country;
  console.log(countryCode);
  const insert = await db.query('INSERT INTO visited_countries (country_code) VALUES($1)', [countryCode]);
  console.log(insert);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
