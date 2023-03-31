import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

function Dashboard() {

    const { isLoading, error } = useAuth0();

    if (error) return (<p>Authentication Error</p>)
    if (!error && isLoading) return (<p>Loading...</p>)
    if (!error && !isLoading) {
        return (
                <Profile />
        )
    }
}

export default Dashboard;