var mongoose = require('mongoose');

mongoose.connect(
        //Todo: remove dotenv variables
        'mongodb+srv://' + process.env.USRNAME + ':' + process.env.PSWD + '@cluster0.gqndl.mongodb.net/pubSubDb?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }
    ).then(function(db) {
        console.log('mongoose connection successful');
    })
    .catch(function(err) {
        console.log(err);
    });
//add a subscription to a topic (url of subscribing service)
function helper1(topicId, url, schema) {
    return schema.findByIdAndUpdate(topicId, {
        $push: {
            subscription: url
        }
    }, { new: true, useFindAndModify: false });
}

//Insert a fresh new topic
function helper2(topic, schema) {
    return schema.create(topic)
        .then(function(_topic) {
            console.log('new topic has been inserted into the DB:\n', _topic);
            return _topic;
        });
}

//insert a post into a topic by its id
function helper3(topicId, post, schema) {
    return schema.findByIdAndUpdate(topicId, {
        $push: {
            post: post
        }
    }, { new: true, useFindAndModify: false });
}

//return a single topic object by topics name
function helper4(topic, schema) {
    return schema.findOne({ topic: topic })
        .then(function(_topic) {
            console.log('returned all data related to:\n', _topic);
            return _topic;
        });
}


module.exports = {
    SubscribeUrltoTopic: helper1,
    CreateTopic: helper2,
    AddPostToTopic: helper3,
    getTopicSubscribers: helper4
};