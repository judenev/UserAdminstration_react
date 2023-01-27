import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import colors from 'colors';
import dotenv from 'dotenv'
import cors from 'cors'

import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'
import connectDB from './db.js';
import AppError from './utils/appError.js';

dotenv.config({ path: "./config.env" });

const server = express();

server.use(cors({ origin: "http://localhost:3000" }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use('/api', userRouter);
server.use('/api/admin', adminRouter);

// Development logging
if (process.env.NODE_ENV=='development') {
    server.use(morgan('dev'));
}

//connecting mongodb
connectDB();

// catch 404 and forward to error handler
server.all('*', (req, res, next)=> {
    next(new AppError('Not found',404));
});

// error handler
server.use(function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (err.statusCode === 404) {
        res.status(err.statusCode).json({ errors: err.status, errorMessage: err.message })
    } else {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
});

server.listen(process.env.PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log(`Server listening on Port ${process.env.PORT}`.bgGreen);
})