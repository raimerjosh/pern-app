import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {

    }

    return (
        <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
            <button type="submit" onSubmit={handleSubmit}>Login</button>
        </form>
        <Link to='/register'>Register</Link>
    </div>
    )
}

export default Login;