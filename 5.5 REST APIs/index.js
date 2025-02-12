import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "b3a29ccc-0300-4709-9327-badf6bc1e125";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  const postSecret = req.body.secret;
  const postScore = req.body.score;
  try {
    const insert = await axios.post(API_URL + "/secrets", {secret:postSecret, score:postScore}, config);
    console.log(insert);
    res.render("index.ejs", {content: JSON.stringify(insert.data)});
  } catch (error) {
    res.sendStatus(404).send("Error while inserting data " + error.message);
    res.redirect("/");
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  const putSecret = req.body.secret;
  const putScore = req.body.score;
  console.log("Form Data's: " + searchId + putSecret + putScore);
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  try {
    const updatePut = await axios.put(API_URL + "/secrets/" + searchId, {searchId:searchId, secret:putSecret, score:putScore}, config);
    console.log(updatePut);
    res.render("index.ejs", {content: JSON.stringify(updatePut.data)});
  } catch (error) {
    res.sendStatus(404).send("Error while updating data(PUT) ", error.message);
    res.redirect("/")
    console.error("Problem while updating data ", error.message);
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  const patchSecret = req.body.secret;
  const patchScore = req.body.score;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  try {
    const updatePatch = await axios.patch(API_URL + "/secrets/" + searchId, {searchId:searchId,  score:patchScore}, config);
    console.log(updatePatch);
    res.render("index.ejs", {content:JSON.stringify(updatePatch.data)});
  } catch (error) {
    res.sendStatus(404).send("Error while patch the data: " + error.message);
    res.redirect('/');
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try {
    const reqDelete = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", {content:`The data has been deleted successfully ${searchId}`});
  } catch (error) {
    res.sendStatus(404).send("Problem in deleting data: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
