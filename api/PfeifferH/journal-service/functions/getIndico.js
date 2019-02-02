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

        fetch('https://apiv2.indico.io/emotion', {
            method: 'POST',
            body: JSON.stringify({
                api_key: '3deac03d4a4ed32e154aa18e4742fecf',
                data: input_data.text
            })
        })
        .then(r => r.json())
        // TODO: Send a success/failure response to the client
        .then(response => {
            // TODO: Store information to firebase
            console.log(response);
        })
        .catch(err => console.log(err));
    });

    res.send("endget");

});

app.post('/', function (req, res) {

    var input_data = "";
    req.on('data', (chunk) => {
        input_data += chunk;
    });

    req.on('end', ()=>{
        input_data = JSON.parse(input_data);

        fetch('https://apiv2.indico.io/emotion', {
            method: 'POST',
            body: JSON.stringify({
                api_key: '3deac03d4a4ed32e154aa18e4742fecf',
                data: input_data.text
            })
        })
        .then(r => r.json())
        // TODO: Send a success/failure response to the client
        .then(response => {
            // TODO: Store information to firebase
            console.log(response);
        })
        .catch(err => console.log(err));
    });

    res.send("endpost");

});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
