var db = [];

var Topic = {
    createTopic: (topic) => {
        db.push(topic);
        console.log('topic created');
    },
    exists: (topic) => {
        const _topic = db.find(x => x.topic === topic.topic);
        console.log('topic exists: ' + (typeof _topic !== 'undefined'));
        return (typeof _topic !== 'undefined');
    },
    find: (topic) => {
        const _topic = db.find(x => x.topic === topic.topic);
        return _topic;
    },
    insertSubscriber: (topic, subscriber) => {
        const index = db.findIndex(x => x.topic === topic.topic);
        db[index].subscribers.push(subscriber);
        console.log('subscription inserted');
    },
    insertPost: (topic, post) => {
        const index = db.findIndex(x => x.topic === topic.topic);
        db[index].posts.push(post);
        console.log('post inserted');
    }
};

module.exports = Topic;