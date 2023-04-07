import React from "react";

function AddScore({handleAddFormChange, handleAddFormSubmit}) {
    return (
        <div className="AddScoreContainer">
            <h4>Add a Score</h4>
            <form onSubmit={handleAddFormSubmit} className="AddScoreForm">
                <input
                    type="text"
                    name="courseName"
                    required="required"
                    placeholder="Enter a course..."
                    onChange={handleAddFormChange}/>
                <input
                    type="integer"
                    name="par"
                    required="required"
                    placeholder="Enter the par..."
                    onChange={handleAddFormChange}/>
                <input
                    type="integer"
                    name="score"
                    required="required"
                    placeholder="Enter your score..."
                    onChange={handleAddFormChange}/>
                <input
                    type="date"
                    name="date"
                    required="required"
                    placeholder="Enter date..."
                    onChange={handleAddFormChange}/>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddScore;
