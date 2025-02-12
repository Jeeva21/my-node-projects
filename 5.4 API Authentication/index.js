import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "jeeva";
const yourPassword = "jeeva21";
const yourAPIKey = "ec162bdb-a21a-443b-aa0c-9b466bd43793";
const yourBearerToken = "b3a29ccc-0300-4709-9327-badf6bc1e125";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const randomSecrets = await axios.get(API_URL + "/random");
    const result = randomSecrets.data;
    console.log(result);
    res.render("index.ejs", {content:JSON.stringify(result)});
  } catch (error) {
    console.error("Failed to get request: " + error.message);
    res.redirect("/");
  }
});

app.get("/basicAuth", async(req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try {
    const getAll = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      }
     });
     console.log(getAll);
     res.render("index.ejs", {content:JSON.stringify(getAll.data)});
  } catch (error) {
    console.error("Failed to get request: " + error.message);
    res.redirect("/");
  }
 
});

app.get("/apiKey", async(req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const apiRequest = await axios.get(API_URL + `/filter?score=7&apiKey=${yourAPIKey}`);
    res.render("index.ejs", {content:JSON.stringify(apiRequest.data)});
  } catch (error) {
    console.error("Faield to get request: " + error.message);
    res.redirect("/");
  }
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try {
    const bearerToken = await axios.get(API_URL + "/secrets/2", {
      headers:{
        Authorization:`Bearer ${yourBearerToken}`
      }
    });
    console.log(bearerToken);
    res.render("index.ejs", {content:JSON.stringify(bearerToken.data)});
  } catch (error) {
    console.error("Failed to get request: " + error.message);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
