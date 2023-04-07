import React from "react";

const ReadOnlyRow = ({ score, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td id="Course">{score.courseName}</td>
      <td id="Par">{score.par}</td>
      <td id="Score">{score.score}</td>
      <td id="Date">{score.date}</td>
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