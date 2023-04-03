import React from "react";

function Score({score, par, course, date}) {

    return (
          <tr>
            <td data-label="Course" className="BreakpointLabel">{course}</td>
            <td data-label="Par">{par}</td>
            <td data-label="Score">{score}</td>
            <td data-label="Date">{date}</td>
          </tr>
    )
}

export default Score;