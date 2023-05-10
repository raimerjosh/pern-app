const Pool = require('pg').Pool

//Put in .env file after development
const pool = new Pool({
  host: 'localhost',
  database: 'golf_scores',
  port: 5432,
})

const getScores = (req, res) => {
    const { userEmail } = req.body;
    pool.query('SELECT "courseName", "par", "score", "date", "scoreId" FROM "user" INNER JOIN score ON "user".id = user_id WHERE "user".email = $1', [userEmail], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).json(results.rows)
    })
}


const getUserId = (req, res, next) => {
    const { userEmail, courseName, par, score, date } = req.body;

    pool.query('SELECT id FROM "user" WHERE "user".email = $1', [userEmail], (err, results) => {
        if (err) {
            throw err
        }

        const user = results.rows[0].id;

        req.userObj = {
            user_id: user,
            courseName: courseName,
            par: par,
            score: score,
            date: date
        }
        next()
    })
}

const addScore = (req, res) => {
    const { user_id, courseName, par, score, date } = req.userObj;

    pool.query('INSERT INTO score ("courseName", "par", "score", "date", "user_id") VALUES ($1, $2, $3, $4, $5)', [courseName, par, score, date, user_id], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json('Score added')
    })
}
const updateScore = (req, res) => {
    const { scoreId, courseName, par, score, date } = req.body;
    
    query = `UPDATE score SET "courseName" = ${courseName}, "par" = ${par}, "score" = ${score}, "date" = ${date} WHERE "scoreId" = ${scoreId}`
    
    console.log(query)

    pool.query('UPDATE score SET "courseName" = $1, "par" = $2, "score" = $3, "date" = $4 WHERE "scoreId" = $5', [courseName, par, score, date, scoreId], (err, results) => {
        if (err) {
            throw err
        }
        console.log(results.rows)
        res.status(200).json('Score updated')
    })
}

const deleteScore = (req, res) => {
    const { scoreId } = req.body;

    pool.query('DELETE FROM score WHERE "scoreId" = $1', [scoreId], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json('Score deleted')
    })

}

module.exports = {
    getScores,
    addScore,
    getUserId,
    deleteScore,
    updateScore
}

