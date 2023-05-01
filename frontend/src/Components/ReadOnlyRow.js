import React from "react";

const ReadOnlyRow = ({ score, handleEditClick, handleDeleteClick }) => {
  
  //converts date string to exclude timezone

    let dateObj = new Date(score.date)
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let newdate = month + "-" + day + "-" + year; 

  return (
    <tr>
      <td id="Course">{score.courseName}</td>
      <td id="Par">{score.par}</td>
      <td id="Score">{score.score}</td>
      <td id="Date">{newdate}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, score)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(score.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;