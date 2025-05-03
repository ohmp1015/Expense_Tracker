# Expense_Tracker

This is a MERN (MongoDB, Express, React, Node.js) stack application for tracking personal expenses and incomes. It provides a simple interface to add, update, and delete expenses and incomes, and displays a summary of the balance.

## Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose, CORS, dotenv
- **Frontend:** React, React Scripts

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory to configure environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

   - If `MONGODB_URI` is not provided, the app will connect to a local MongoDB instance at `mongodb://localhost:27017/expense_tracker`.
   - The `PORT` defaults to `5000` if not specified.

4. Start the backend server:
   ```bash
   npm start
   ```

   The backend API will be available at `http://localhost:5000/api/transactions`.

## Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

   The React app will open in your default browser at `http://localhost:3000`. It proxies API requests to the backend server at `http://localhost:5000`.

## Features

- Add, update, and delete expenses and incomes.
- View a summary of total income, total expenses, and current balance.
- Error handling with user-friendly messages.
- Responsive and clean user interface.

## Project Structure

- `backend/`: Contains the Express server, API routes, and MongoDB models.
- `frontend/`: Contains the React application source code and public assets.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is open source and available under the MIT License.
