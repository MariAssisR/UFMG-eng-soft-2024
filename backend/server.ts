import express, { Express, Request, Response } from 'express';
import { json } from 'body-parser';

import { Rotes } from './routes';
import mongoose from './database/database.config';

const app: Express = express();

const port = 8080

app.use(json());

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
  
db.once('open', () => {
    console.log('MongoDB connection successful');
});

app.use((req : Request, res : Response, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(Rotes);

app.listen(port, () => console.log(`Tasks server is listening on port ${port}.`));
