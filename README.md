# Todo App

This is a full-stack Todo App, built with React, TypeScript, Node.js, and Prisma.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js and npm.
- You have a PostgreSQL database running.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/todo-app.git
    ```

2. Navigate to the project directory:
    ```sh
    cd todo-app
    ```

## Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the [backend](http://_vscodecontentref_/0) directory and add your database connection string:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
    ```

4. Run the Prisma migrations to set up the database schema:
    ```sh
    npx prisma migrate dev --name init
    ```

5. Start the backend server:
    ```sh
    npm start
    ```

## Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Testing

To run the tests for  frontend  use the following commands:

### Fronten Tests
```sh
cd frontend
npm test
