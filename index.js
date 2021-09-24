'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

//Creates webhook endpoint
app.post('/webhook', (req, res) => {
    let body = req.body;
    //checks this is an event from a page subscription
    if(body.object === 'page') {
        body.entry.forEach(entry => {
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

app.get('/webhook', (req, res) => {
    //My verify token. 
    let VERIFY_TOKEN = "<TOKEN GOES HERE>";

    //Parse query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    //Checks if token and mode is in the query string of the request
    if (mode && token) {
        //Respons with challenge token from request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});