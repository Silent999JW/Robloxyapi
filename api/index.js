const express = require('express');
const app = express();

app.use(express.json());

// Temporary memory store (clears if the API isn't used for a while)
let currentCommand = {
    command: "NONE",
    time: 0,
    pos: "0,0,0"
};

// GET: Alts check this
app.get('/api', (req, res) => {
    res.status(200).json(currentCommand);
});

// POST: Owner sends this
app.post('/api', (req, res) => {
    const { command, pos } = req.body;
    
    currentCommand = {
        command: command || "NONE",
        time: Date.now(),
        pos: pos || "0,0,0"
    };
    
    res.status(200).send("Command Updated");
});

// CRITICAL for Vercel: Export the app
module.exports = app;
