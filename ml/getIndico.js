//const lib = require('lib');
var express = require('express');
var app = express();
app.use(express.json())
const fetch = require("node-fetch");
var port = 3000;

app.get('/', function(req, res) {
    
    var input_data = "";
    req.on('data', (chunk) => {
        input_data += chunk;
    });

    req.on('end', ()=>{
    input_data = JSON.parse(input_data);

    console.log(input_data)

    fetch('https://apiv2.indico.io/emotion', {
        method: 'POST',
        body: JSON.stringify({
            api_key: 'e8ed0c055e13d18183a1513838645d8a',
            data: input_data.text
        })
    })
    .then(r => r.json())
    .then(response => {
        console.log(response.results);
        // Send a success response to the client
        res.status(200).json({status:"ok"})
        // TODO: Store information to firebase

        let emojson = JSON.stringify(response.results);
        let emo64 = Buffer.from(emojson).toString("base64");

    
        fetch("https://pfeifferh.lib.id/journal-service@dev/updateSession/?userId=" + input_data.userID
        + "&sessionId=" + input_data.sessionID + "&text=" + input_data.text + "&emotions=" + emo64)
        .then(response => {
            console.log("responese normal");
        })
        .catch(err => console.log(err));            
    })
    // Send a failure response to the client
    .catch(err => console.log(err));
    });

});

app.post('/', function (req, res) {

    var input_data = "";
    req.on('data', (chunk) => {
        input_data += chunk;
    });

    req.on('end', ()=>{
        input_data = JSON.parse(input_data);

        console.log(input_data)

        fetch('https://apiv2.indico.io/emotion', {
            method: 'POST',
            body: JSON.stringify({
                api_key: 'e8ed0c055e13d18183a1513838645d8a',
                data: input_data.text
            })
        })
        .then(r => r.json())
        .then(response => {
            console.log(response.results);
            // Send a success response to the client
            res.status(200).json({status:"ok"})
            // TODO: Store information to firebase

            let emojson = JSON.stringify(response.results);
            let emo64 = Buffer.from(emojson).toString("base64");

      
            fetch("https://pfeifferh.lib.id/journal-service@dev/updateSession/?userId=" + input_data.userID
            + "&sessionId=" + input_data.sessionID + "&text=" + input_data.text + "&emotions=" + emo64)
            .then(response => {
                console.log("responese normal");
            })
            .catch(err => console.log(err));            
        })
        // Send a failure response to the client
        .catch(err => console.log(err));
        //.catch(err => {
        //    res.status(500).json({status:err})
        //});
    });

    //res.send("endpost");

});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
