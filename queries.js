const Pool = require('pg').Pool

//Put in .env file after development
const pool = new Pool({
  host: 'localhost',
  database: 'golf_scores',
  port: 5432,
})

const getScores = (req, res) => {
    const { userEmail } = req.body;
    pool.query('SELECT "courseName", "par", "score", "date" FROM "user" INNER JOIN score ON "user".id = user_id WHERE "user".email = $1', [userEmail], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).json(results.rows)
    })
}

const addScore = (req, res) => {
    const { courseName, par, score, date } = req.body;

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

