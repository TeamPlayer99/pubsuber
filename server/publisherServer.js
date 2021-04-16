var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

var publisherServer = express();
var jsonParser = bodyParser.json();


var TopicModel = require('../models/topic.js');

//endpoint to broadcast posts
publisherServer.post('/publish/:topic', jsonParser, function(req, res) {

    //get a topic object from the db
    var dbTopic = TopicModel.find(req.params);

    TopicModel.insertPost(req.params, req.body);

    //for each server endpoint subscribed do a post operation carrying a request body
    //containing the post message sent under that topic
    dbTopic.subscribers.forEach(function(element) {
        axios({
            method: 'post',
            url: element.url,
            data: req.body
        });
    });

    //send back the number of subscribers in topic and the post
    res.send({
        subscribers: dbTopic.subscribers.length,
        data: req.body
    });
});

//endpoint to subscribe to a topic
publisherServer.post('/subscribe/:topic', jsonParser, function(req, res) {

    //if that topic exist go ahead and add it to array of 
    //subscribers else create a new topic with subscriber
    if (TopicModel.exists(req.params)) {
        TopicModel.insertSubscriber(req.params, req.body);
    } else {
        const dbTopic = {
            topic: req.params.topic,
            subscribers: [req.body],
            posts: []
        };

        TopicModel.createTopic(dbTopic);
    }

    //response body { url: 'http:localhost:9000/test', topic: 'Hello World'}
    res.send({
        url: req.body.url,
        topic: req.params.topic
    });

    console.log(req.params);
    console.log(TopicModel.exists(req.params));
});

module.exports = publisherServer;