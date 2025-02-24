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

async function checkVisisted(){
  const visitedCountries = await db.query("SELECT * FROM visited_countries");
  let countries = [];
  visitedCountries.rows.forEach(country => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  // const result = await db.query("SELECT * FROM visited_countries");
  // const data = result.rows;
  // console.log(data);
  // let countries = [];
  // data.forEach(country => {
  //   countries.push(country.country_code);
  // });
  const countries = await checkVisisted();
  res.render("index.ejs", {total:countries.length, countries:countries});
  console.log(countries);
});

app.post("/add", async (req, res)=>{
  const input = req.body.country;
  const inputUpperCase = input.toUpperCase();
  try {
    const getCountryCode = await db.query('SELECT country_code FROM countries WHERE country_name= $1', [input]);
 

  // console.log("From DB we getting this." + getCountryCode.rows);
  // getCountryCode.rows.forEach(countryCD => {
  //   console.log("Right Country Code: " + countryCD.country_code);
  // });

  if (input.length === 2){
    await db.query('INSERT INTO visited_countries (country_code) VALUES($1)', [inputUpperCase]);
  }else if(getCountryCode.rows.length !== 0){
    const countryCode = getCountryCode.rows[0].country_code;
    await db.query('INSERT INTO visited_countries (country_code) VALUES($1)', [countryCode]);
  }
  res.redirect("/");
  } catch (error) {
  const countries = await visitedCountries();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    error:"The country you entered is not exists, please again."
  });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
