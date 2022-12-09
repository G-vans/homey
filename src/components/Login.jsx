import { useState } from "react";
import {useNavigate} from 'react-router-dom'

export default function Login({ handleClick, onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user));
                navigate(`/properties`)
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <div>
            <form id="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="input-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {errors.length > 0 &&
                    <div className='input-control'>
                        <div style={{ color: "red" }}>
                            {errors.map((error, index) =>
                                <p key={index}>{error}</p>
                            )}
                        </div>
                    </div>
                }
                <div className="input-control">
                    <button type="submit">Login</button>
                </div>
                <div className="input-control">
                    <p className='p'>Don't have an account ? <span onClick={handleClick}>Sign Up</span> </p>
                </div>
            </form>
        </div>
    )
}
