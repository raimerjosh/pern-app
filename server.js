// As long as this app is in development, it will set our env variables as "process.env"
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const PORT = 3001;
const app = express();


// Allows json formatted request body to be parsed
app.use(bodyParser.json())

app.use(cors());

app.use(express.urlencoded({ extended: false }));


const db = require('./queries');


// Routes
app.post('/scores', db.getScores, (req, res) => {})

app.post('/score', db.getUserId, db.addScore, (req, res) => {})

app.delete('/score', db.deleteScore, (req, res) => {})

app.put('/score', db.updateScore, (req, res) => {})


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
