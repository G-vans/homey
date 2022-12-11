import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'

export default function SignUp({ handleClick, onLogin }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
                password_confirmation: passwordConfirmation,
                role: "visitor"
            }),
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
                <h1>Registration</h1>
                <div className="input-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input-control">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" id="password2" name="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </div>
                <div className='input-group'>
                    {errors.length > 0 && (
                        <div style={{ color: "red" }}>
                            {errors.map((error) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    )}
                </div>
                <div className="input-control">
                    <button type="submit">Register</button>
                </div>
                <div className="input-control">
                    <p className='p'>Already have an account? <span onClick={handleClick}>Login</span></p>
                </div>
            </form>
        </div>
    )
}
