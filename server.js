const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));
app.use(express.json());

// Route to handle saving feedback
app.post('/saveFeedback', (req, res) => {
    const newFeedback = req.body;

    // Load existing feedbacks
    const feedbacksPath = path.join(__dirname, 'feedbacks.json');
    let feedbacks = JSON.parse(fs.readFileSync(feedbacksPath, 'utf-8'));

    // Add new feedback
    feedbacks.unshift(newFeedback);

    // Save updated feedbacks back to file
    fs.writeFileSync(feedbacksPath, JSON.stringify(feedbacks, null, 2));

    res.sendStatus(200);
});

// Route to retrieve all feedbacks
app.get('/feedbacks', (req, res) => {
    const feedbacksPath = path.join(__dirname, 'feedbacks.json');
    const feedbacks = JSON.parse(fs.readFileSync(feedbacksPath, 'utf-8'));

    res.json(feedbacks);
});

// Fallback to serve 'index.html' for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});