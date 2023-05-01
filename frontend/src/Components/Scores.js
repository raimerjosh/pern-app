import { useEffect, useState, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { nanoid } from "nanoid";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
import AddScore from "./AddScore";


function Scores() {
    const { isAuthenticated } = useAuth0();
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

// Need to pull the email from Auth0 user object to give to the query to add score to right user

    // Returns Score objects 
    useEffect(() => {

        if (!isAuthenticated) {
            navigate('/')
        }

        fetch('http://localhost:3001/scores')
         .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error, the status is: ${res.status}`)
            }
            return res.json()
            })  
         .then(data => {
            setScores(data)
         })
         .catch((err) => {
            console.log(err.message)
         })

    }, [])

    const [addFormData, setAddFormData] = useState({
        courseName: "",
        par: "",
        score: "",
        date: "",
    });

    const [editFormData, setEditFormData] = useState({
        courseName: "",
        par: "",
        score: "",
        date: "",
    });

    const [editScoreId, setEditScoreId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();

        await fetch('http://localhost:3001/scores', {
            method: 'POST',
            body: JSON.stringify({
                courseName: addFormData.courseName,
                par: addFormData.par,
                score: addFormData.score,
                date: addFormData.date,
                //This needs user_id to put into query 
            }),
            headers: {"Content-Type": "application/json"}
          })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(`You have an error: ${err}`))

        const newScore = {
            id: nanoid(),
            courseName: addFormData.courseName,
            par: addFormData.par,
            score: addFormData.score,
            date: addFormData.date,
        };

        const newScores = [...scores, newScore];
        setScores(newScores);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedScore = {
        id: editScoreId,
        courseName: editFormData.courseName,
        par: editFormData.par,
        score: editFormData.score,
        date: editFormData.date,
        };

        const newScores = [...scores];

        const index = scores.findIndex((score) => score.id === editScoreId);

        newScores[index] = editedScore;

        setScores(newScores);
        setEditScoreId(null);
    };

    const handleEditClick = (event, score) => {
        event.preventDefault();
        setEditScoreId(score.id);

        const formValues = {
        courseName: score.courseName,
        par: score.par,
        score: score.score,
        date: score.date,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditScoreId(null);
    };

    const handleDeleteClick = (scoreId) => {
        const newScores = [...scores];

        const index = scores.findIndex((score) => score.id === scoreId);

        newScores.splice(index, 1);

        setScores(newScores);
    };

    return (
        isAuthenticated && (
        <div className="ScoresContainer">

            <button className="ProfileLinkContainer">
                <Link to="/" className="ProfileLink">Return to Profile</Link>
            </button>

            <AddScore 
                handleAddFormChange={handleAddFormChange}
                handleAddFormSubmit={handleAddFormSubmit}/>
            
            <div className="FormContainer">
                <form onSubmit={handleEditFormSubmit}>
                    <table className="ScoresTable">
                        <thead>
                            <tr>
                            <th>Course</th>
                            <th>Par</th>
                            <th>Score</th>
                            <th>Date</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((score) => (
                            <Fragment>
                                {editScoreId === score.id ? (
                                <EditableRow
                                    editFormData={editFormData}
                                    handleEditFormChange={handleEditFormChange}
                                    handleCancelClick={handleCancelClick}
                                />
                                ) : (
                                <ReadOnlyRow
                                    score={score}
                                    handleEditClick={handleEditClick}
                                    handleDeleteClick={handleDeleteClick}
                                />
                                )}
                            </Fragment>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
      </div>
    ))
}

export default Scores;