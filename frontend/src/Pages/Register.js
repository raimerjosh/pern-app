import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registered, setRegistered] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:3000/register", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => setRegistered(json))

        // Navigate to login page if registration is successful or back to register if response status isn't 200

        // if(registered) {
        //     navigate('/login')
        // } else {
        //     navigate('/register')
        // }
        
        setName("")
        setEmail("")
        setPassword("")
    }
    

    return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Name</label>
            <input type="text"
                required
                name="name"
                value={name} 
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
            <label>Email</label>
            <input type="text" 
                required
                name="email"
                value={email}  
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
            <label>Password</label>
            <input type="password" 
                required
                name="password"
                value={password}  
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" onSubmit={handleSubmit}>Register</button>
        </form>
        <Link to='/login'>Login</Link>
    </div> 
    )
}

export default Register;