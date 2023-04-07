import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="NoAuthAlert">
        <h3>Please Sign In to View/Input Scores!</h3>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
        <div className="ProfileContainer">
          <h3>{`Welcome ${user.name}`}</h3>
          <div>
            <img src={user.picture} alt={user.name} className="ProfileImage"/>
          </div>
          <div>
            <button className="ScoresLinkContainer">
              <Link 
                to="/scores" 
                className="ScoresLink">View Your Recent Scores
              </Link>
            </button>
          </div>
        </div>
      )
  }
};

export default Profile;