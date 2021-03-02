require("dotenv").config();

// Server
export const serverPort: string | number = process.env.PORT || 5000;

// Database
export const dbUrl: string | undefined = process.env.DB_URL;
export const dbUser: string | undefined = process.env.DB_USER;
export const dbPassword: string | undefined = process.env.DB_PASSWORD;
export const dbHost: string | undefined = process.env.DB_HOST;
export const dbPort: string | number | undefined = process.env.DB_PORT;
export const dbName: string | undefined = process.env.DB_NAME;
