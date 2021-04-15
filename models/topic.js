var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
    topic: String,
    post: [],
    subscription: []
});

var Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;