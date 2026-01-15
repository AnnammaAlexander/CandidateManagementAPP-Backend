import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middlewares/error.js';
// Route files
import auth from './routes/auth.js';
import candidates from './routes/candidates.js';
import admin from './routes/admin.js';

dotenv.config();

const app = express();

app.use(express.json());

// Set security headers
app.use(helmet());

app.use(cors());

// Mount routers
app.use('/auth', auth);
app.use('/candidates', candidates);
app.use('/admin', admin);


app.get('/', (req, res) => {
    res.send('Welcome to Candidate Management API');
});

// Centralized Error Handler
app.use(errorHandler);

export default app;
