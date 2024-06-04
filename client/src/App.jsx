import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ChatRoom from './ChatRoom';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat-room" element={<ChatRoom />} />
        </Routes>
    </Router>
);

export default App
