import { React } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./Components/Dashboard";
import Scores from "./Components/Scores";
import Header from "./Components/Header";

function App() {
  const { isLoading, error } = useAuth0();

  if (error) return (<p>Authentication Error</p>)
  if (!error && isLoading) return (<p>Loading...</p>)
  
  if (!error && !isLoading) {
    return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/scores" element={<Scores/>}/>
        </Routes>
      </div>
    )
  }
}

export default App;
