const querystring = require('querystring');
const Axios = require('axios');
require('dotenv').config();
const express = require("express"),
    app = express(),
    port = process.env.PORT || 5000,
    cors = require("cors");

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));


app.get("/", (req, res) => {

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
    }
        Axios.post('https://accounts.spotify.com/api/token?grant_type=client_credentials', querystring.stringify({}), {
          headers
        })
        .then(function(response) {
            //console.log('token: ' + response.data.access_token)

            const responseObject = {
            statusCode: 200,
            body: (response.data.access_token),
            message: "we did it !"
        };
        res.send(responseObject);
        //console.log(responseObject);
        
    })
    .catch(function(err) {
        console.error("Error: " + err);
        
    });
    
});
