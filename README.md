# Chat Application

## Description

This project is a simple chat application built using React and Ruby on Rails. Users can join chat rooms anonymously, send messages, and interact with other users in real-time.
Project can be viewed [here](https://anonim-chat.vercel.app)

## Prerequisites

- Node.js
- Ruby 3.3.1
- npm or yarn

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/catreedle/chat.git
    ```

2. Navigate to the project directory:

    ```bash
    cd chat
    ```

3. Install Ruby dependencies:

    ```bash
    bundle install
    ```

4. Navigate to the client directory and install Node.js dependencies:

    ```bash
    cd client
    npm install
    ```

5. Set up environment variables:

    Create a `.env` file in the client directory and define the following variables:

    ```plaintext
    VITE_BASE_URL=http://localhost:3000
    VITE_SOCKET_URL=ws://localhost:3000

    ```

## Usage

1. Start the Rails server:

    ```bash
    rails s
    ```

2. Open another terminal window/tab and navigate to the client directory:

    ```bash
    cd client
    ```

3. Start the development server for the React frontend:

    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

5. Use the chat application to join chat rooms, send messages, and interact with other users.

## Testing

### Rails Tests

To run the Rails test suite:

```bash
rails test
```

### React Tests

To run the React test suite:

1. Navigate to the client directory:

    ```bash
    cd client
    ```

2. Run the tests:

    ```bash
    npm test
    ```

## Deployment

To deploy the application to a production environment:

1. Build the project:

    ```bash
    npm run build
    ```

2. Serve the built assets using a web server like Nginx or deploy to a platform like Vercel or Netlify.

## Contributing

Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact [Purnama](mailto:purnamasrahayu@gmail.com).

