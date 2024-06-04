import './Home.css'
import icon from '/chat-icon.png'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Get the username from the cookie on component mount
        const savedUsername = Cookies.get('username');
        if (savedUsername) {
            setUsername(savedUsername);
            navigate('/chat-room')
        }
    }, []);

    const handleSetUsername = async (e) => {
        // check username list in database
        e.preventDefault()
        if (username) {
            // Set the username in a cookie
            const response = await fetch("http://localhost:3000/users", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username })
            })
            const data = await response.json()
            if (response.status !== 201) {
                alert(JSON.stringify(data))
                return
            }
            Cookies.set('username', data.username, { expires: 1, secure: true, sameSite: 'Strict' });// expires in 1 day

            navigate('/chat-room');
        }
    };

    const handleChange = (event) => {
        setUsername(event.target.value);
    };
    return (
        <div className="centered-form">
            <div className="centered-form__box">
                <div className="centered-form__header">
                    <div className="chat-icon"><img src={icon} alt="chat-icon" /></div>
                    <h1>Chat Anonymously</h1>
                </div>
                <form>
                    <label>Display name</label>
                    <input onChange={handleChange} type="text" name="username" placeholder="Display name" required />
                    <button onClick={handleSetUsername}>Join</button>
                </form>
            </div>
        </div>
    )
}

export default Home