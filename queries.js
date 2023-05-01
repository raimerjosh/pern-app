const Pool = require('pg').Pool

//Put in .env file after development
const pool = new Pool({
  host: 'localhost',
  database: 'golf_scores',
  port: 5432,
})

const getScores = (req, res) => {
    pool.query('SELECT * FROM score', (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).json(results.rows)
    })
}

const addScore = (req, res) => {
    const { courseName, par, score, date } = req.body;
    console.log(req.body.courseName);

    pool.query('INSERT INTO score ("courseName", par, score, date, user_id) VALUES ($1, $2, $3, $4, $5)', [courseName, par, score, date], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).send(`Score added for your round at ${results.rows[0].courseName}`)
    })
}

module.exports = {
    getScores,
    addScore
}

