import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import ChatRoom from './pages/ChatRoom/ChatRoom';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat-room" element={<ChatRoom />} />
        </Routes>
    </Router>
);

export default App
