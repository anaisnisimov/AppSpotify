const express = require("express"),
app = express(),
port = process.env.PORT || 5000,
cors = require("cors");
const axios = require("axios");
const queryString = require('query-string');
require('dotenv').config()

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
    };
    axios.post('https://accounts.spotify.com/api/token?grant_type=client_credentials', queryString.stringify({}), {
      headers
    })
    .then(apiResponse => {
        const responseObject = {
            statusCode: 200,
            body: (apiResponse.data.access_token),
            message: "we dit it "
        };
        res.send(responseObject);
    })
    .catch(err => {
        console.error("Error: " + err);
    });
});