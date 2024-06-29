const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/saveFeedback', (req, res) => {
    const newFeedback = req.body;
    const feedbacksPath = path.join(__dirname, 'feedbacks.json');
    let feedbacks = JSON.parse(fs.readFileSync(feedbacksPath, 'utf-8'));
    feedbacks.unshift(newFeedback);
    fs.writeFileSync(feedbacksPath, JSON.stringify(feedbacks, null, 2));
    res.sendStatus(200);
});

app.get('/feedbacks', (req, res) => {
    const feedbacksPath = path.join(__dirname, 'feedbacks.json');
    const feedbacks = JSON.parse(fs.readFileSync(feedbacksPath, 'utf-8'));
    res.json(feedbacks);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
