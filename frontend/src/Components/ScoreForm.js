import React from "react";
import { useState } from "react";

function ScoreForm() {

    const [ course, setCourse ] = useState('');
    const [ par, setPar ] = useState('');
    const [ score, setScore ] = useState('');
    const [ date, setDate ] = useState('');

    async function handleSubmit() {

        const body = {
            course: course,
            par: par,
            score: score,
            date: date
        };

        await fetch('http://localhost:3001/scores', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => console.log(`Response recieved: ${data}`))

    }

    return(
        <form onSubmit={handleSubmit}>
            <label> Course
                <input value={course} 
                    onChange={((e) => setCourse(e.target.value))}/>
            </label>

            <label> Par
            <input value={par} 
                onChange={((e) => setPar(e.target.value))}/>
            </label>

            <label> Score
            <input 
                value={score} 
                onChange={((e) => setScore(e.target.value))}/>
            </label>

            <label> Date
            <input 
                value={date} 
                onChange={((e) => setDate(e.target.value))}/>
            </label>
            <input type="submit"/>
        </form>
    )
}

export default ScoreForm;