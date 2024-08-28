import { useEffect, useState } from 'react'
import './ChatRoom.css'
import icon from '/chat-icon.png';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('')
    const [guid, setGuid] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const messagesContainer = document.getElementById("messages");


    useEffect(() => {
        const fetchMessages = async () => {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/messages`);
          const data = await response.json();
          setMessages(data);
          resetScroll();
        };
    
        fetchMessages();
      }, []);

    useEffect(() => {
        const ws = new WebSocket(`${import.meta.env.VITE_SOCKET_URL}/cable`);

        ws.onopen = () => {
            console.log("Connected to websocket server");
            setGuid(Math.random().toString(36).substring(2, 15));

            ws.send(
                JSON.stringify({
                    command: "subscribe",
                    identifier: JSON.stringify({
                        id: guid,
                        channel: "MessagesChannel",
                    }),
                })
            );
        };

        ws.onmessage = async (e) => {
            const data = JSON.parse(e.data);
            if (["ping", "welcome", "confirm_subscription"].includes(data.type)) return;
            const message = data.message
            setMessages((prevMessages) => {
                if (prevMessages.some((msg) => msg.id === message.id)) {
                  return prevMessages; // Avoid adding duplicates
                }
                return [...prevMessages, message];
              });
        };

        ws.onclose = (event) => {
            navigate('/');
            console.log(`WebSocket connection closed for ${username}`, event);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws.close();
        };

        // Cleanup function: Disconnect socket when component unmounts
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                console.log('Closing websocket connection...');
                ws.close();
            }
        };
    }, []);


    useEffect(() => {
        // Get the username from the cookie on component mount
        const savedUsername = Cookies.get('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    useEffect(() => {
        resetScroll()
    }, [messages])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = e.target.message.value;

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body, username }),
            });

            if (!response.ok) {
                throw new Error('Failed to create message');
            } else {
                setError(null)
            }
            e.target.message.value = '';
        } catch (error) {
            setError('Failed to create message. Please try again later.');
        }


    }


    const setMessagesAndScrollDown = (data) => {
        setMessages(data);
        resetScroll()
    }

    const resetScroll = () => {
        if (!messagesContainer) return;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    const handleLeaveChat = () => {
        Cookies.remove('username');
        navigate('/');
    }

    return (
        <div className='App'>
            <div className='messageHeader'>
                <div className='header-logo-container'>
                    <img src={icon} alt="chat-icon" height={60}></img>
                    <h1>Chat Anonymously</h1>
                </div>
                {/* <p>Guid: {guid}</p> */}
                <div className='user-container'>
                    <h2>Hello, <span className='greeting-user'>{username}</span>!</h2>
                    <button className='leave-chat-button' onClick={handleLeaveChat}>Leave Chat</button>
                </div>
            </div>

            <div className='messages' id='messages'>
                {messages.map((message) => (
                    <div className={`message-container ${message.username === username ? 'sent' : 'received'}`} key={message.id}>
                        <div className={`message ${message.username === username ? 'sent' : 'received'}`}>
                            <span className='timestamp'>{moment(message.created_at).format('H:mm')}</span>
                            <p>{message.username !== username && <small><strong>{message.username}</strong>:</small>} {message.body}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='form-container'>
                <div className='messageForm'>
                    <form onSubmit={handleSubmit}>
                        <input className='messageInput' type='text' name='message' autoComplete='off' />
                        <button className='messageButton' type='submit'>
                            Send
                        </button>
                    </form>
                    {error && <div className="error"><small>{error}</small></div>}
                </div>

            </div>
        </div>
    )
}

export default ChatRoom
