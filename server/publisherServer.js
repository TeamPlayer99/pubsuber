var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

var publisherServer = express();
var jsonParser = bodyParser.json();


var TopicModel = require('../models/topic.js');
var dbHelpers = require('../db');

//endpoint to broadcast posts
publisherServer.post('/publish/:topic', jsonParser, function(req, res) {

    //get a topic object from the db
    var dbTopic = dbHelpers.getTopicSubscribers(req.params, TopicModel);

    //for each server endpoint subscribed do a post operation carrying a request body
    //containing the post message sent under that topic
    dbTopic.subscription.forEach(function(element) {
        axios({
            method: 'post',
            url: element.url,
            data: req.body
        });
    });

    //send back the number of subscribers in topic and the post
    res.send({
        subscribers: dbTopic.subscription.length,
        data: req.body
    });
});

//endpoint to subscribe to a topic
publisherServer.post('/subscribe/:topic', jsonParser, function(req, res) {
    //get a topic object from the db
    var dbTopic = dbHelpers.getTopicSubscribers(req.params, TopicModel);

    //Add the url object to the subscribers array of selected topic
    dbHelpers.SubscribeUrltoTopic(dbTopic._id, TopicModel, req.body);

    //response body { url: 'http:localhost:9000/test', topic: 'Hello World'}
    res.send({
        url: req.body.url,
        topic: req.params.topic
    });
});

module.exports = publisherServer;