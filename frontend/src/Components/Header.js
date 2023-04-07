import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function Header() {
    return (
        <div className="HeaderContainer">
            <h1 className="Header">Golf Scores</h1>
            <LoginButton/>
            <LogoutButton/>
        </div>
        
    )
}

export default Header;