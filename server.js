const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

const uri = 'your-mongodb-connection-string'; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let feedbackCollection;

client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
    feedbackCollection = client.db('sunjaz').collection('feedbacks');
    console.log('Connected to MongoDB');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/saveFeedback', async (req, res) => {
    const newFeedback = req.body;
    try {
        await feedbackCollection.insertOne(newFeedback);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error saving feedback', error);
        res.sendStatus(500);
    }
});

app.get('/feedbacks', async (req, res) => {
    try {
        const feedbacks = await feedbackCollection.find().toArray();
        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks', error);
        res.sendStatus(500);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});