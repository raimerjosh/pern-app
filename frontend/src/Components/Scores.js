import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Score from "./Score";

function Scores() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const [data, setData] = useState([]);


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
            setData(data)
         })
         .catch((err) => {
            console.log(err.message)
         })

    }, [])


    return (
        isAuthenticated && (
        <div className="Scores">
            <Link to="/">Return to Profile</Link>
            <div className="ScoreItems">
                {data.map(score => (
                    <Score 
                        score={score.score}
                        par={score.par}
                        course={score.course}
                        id={score.id}
                        date={score.date}
                    />
                ))}
            </div>
        </div>
    ))
}

export default Scores;