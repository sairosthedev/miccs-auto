# Miccs Auto Backend

This is the backend server for the Miccs Auto Online Car Sales Platform.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your environment variables (see below).
3. Start the server:
   ```bash
   npm run dev
   ```

## Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `PORT`: Port number (default: 5000) 