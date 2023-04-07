// As long as this app is in development, it will set our env variables as "process.env"
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const PORT = 3001;
const app = express();

const scores = [
    {
        id: 1,
        date: '2022-05-03',
        score: 75,
        par: 72,
        courseName: 'Olde Florida'
    },
    {
        id: 2,
        date: '2017-10-20',
        score: 78,
        par: 72,
        courseName: 'Olympic Club'
    },
    {
        id: 3,
        date: '2023-03-30',
        score: 80,
        par: 72,
        courseName: 'Holly Tree' 
    },
    {
        id: 4,
        date: '2022-02-21',
        score: 70,
        par: 72,
        courseName: 'Jimmy Clay' 

    },
    {
        id: 5,
        date: '2022-08-01',
        score: 82,
        par: 71,
        courseName: 'Roy Kizer' 

    }
]

// Allows json formatted request body to be parsed
app.use(bodyParser.json())

app.use(cors());

app.use(express.urlencoded({ extended: false }));



// Routes
app.get('/scores', (req, res) => {
    res.json(scores)
})

app.post('/scores', (req, res) => {
    scores.push(req.body)
    res.send(`Score: ${req.body.course} added.`)
})


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
