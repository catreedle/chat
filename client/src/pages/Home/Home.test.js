// src/components/Home/Home.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

jest.mock('../../constants', () => ({
    ENVIRONMENT: 'development',
}));

jest.mock('js-cookie', () => ({
    get: jest.fn(),
    set: jest.fn()
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}));


jest.mock('');

describe('Home component', () => {
    it('renders without crashing', () => {
        render(<Home />);
        expect(screen.getByText('Chat Anonymously')).toBeInTheDocument();
    });

    it('contains a form with a username input and join button', () => {
        render(<Home />);
        expect(screen.getByPlaceholderText('Display name')).toBeInTheDocument();
        expect(screen.getByText('Join')).toBeInTheDocument();
    });

    // it('sets username cookie and navigates on form submission', async () => {
    //     const mockNavigate = jest.fn();
    //     useNavigate.mockReturnValue(mockNavigate);

    //     render(<Home />);

    //     fireEvent.change(screen.getByPlaceholderText('Display name'), {
    //         target: { value: 'testuser' }
    //     });

    //     fireEvent.click(screen.getByText('Join'));

    //     expect(Cookies.set).toHaveBeenCalledWith('username', 'testuser', {
    //         expires: 1,
    //         secure: true,
    //         sameSite: 'Strict'
    //     });

    //     expect(mockNavigate).toHaveBeenCalledWith('/chat-room');
    // });
});
