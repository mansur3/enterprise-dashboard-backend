# Requirements to Run the Backend

To run the backend for the Enterprise Dashboard, ensure you have the following requirements:

1. **Node.js**: Version 14.x or higher.
2. **npm**: Version 6.x or higher.
3. **Database**: sqlite which is already present.
4. **Environment Variables**: Create a `.env` file in the root directory with the following variables:
   - `DATABASE_URL`: hich the server will run.
   - `TOKEN_SECRET`: Secret key for JSON Web Token.

## Installation Steps

1. **Clone the repository**:

   ```sh
   git clone https://github.com/mansur3/enterprise-dashboard-backend.git
   cd enterprise-dashboard-backend
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the server**:

   ```sh
   npm dev
   ```

4. **Access the API**:
   Open your browser or API client and navigate to `http://localhost:2233`.

to health check the backend is running or not please run this in browser
`http://localhost:2233/health-check`

Make sure all the above requirements are met before running the backend.
