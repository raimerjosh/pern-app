import React from "react";

function Score({score, par, course, id, date}) {
    return (
        <ul className="SingleList">
            <h4>{course}</h4>
            <ul key={course}>
                <li key={date}>{date}</li>
                <li key={par}>{`Par: ${par}`}</li>
                <li key={score}>{`Score: ${score}`}</li>
            </ul>
        </ul>
    )
}

export default Score;