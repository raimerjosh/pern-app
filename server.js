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
        date: '12/25/23',
        score: 75,
        par: 72,
        course: 'Olde Florida'
    },
    {
        id: 2,
        date: '10/15/23',
        score: 78,
        par: 72,
        course: 'Olympic Club'
    },
    {
        id: 3,
        date: '2/05/20',
        score: 80,
        par: 72,
        course: 'Holly Tree' 
    },
    {
        id: 4,
        date: '4/15/22',
        score: 70,
        par: 72,
        course: 'Jimmy Clay' 

    },
    {
        id: 5,
        date: '5/25/22',
        score: 82,
        par: 71,
        course: 'Roy Kizer' 

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
    console.log(req.body)
    scores.push(req.body)
    console.log(scores)
})


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
