import express, { Request, Response } from 'express';
import path from 'path';
import connectDb from './config/dbConnection';
import { configDotenv } from 'dotenv';

configDotenv();
const app = express();

// DB config
connectDb();

// Middleware
app.use(express.json());
import UserRoutes from './routes/UserRoutes';
import { ApiMessages } from './utils/types/apiMessages';
import { errorHandler } from './middleware/errorMiddleware';
app.use('/api/auth', UserRoutes);


// Server starting
app.get('/', (_: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), 'index.html')); // Adjust the path to match your file's location
});

// unknown route
app.use((_, res) => {
    const notFound = ApiMessages.ROUTE_NOT_FOUND;
    res.status(notFound.statusCode).json({
        success: false,
        code: notFound.code,
        message: notFound.message,
    });
});

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 8055;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});