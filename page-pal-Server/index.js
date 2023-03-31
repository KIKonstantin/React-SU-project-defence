const port = 3030;
const connectionString = 'mongodb://127.0.0.1:27017/pagePal';
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');

const authController = require('./controllers/authController');
const bookController = require('./controllers/bookController');

const express = require('express');

start();
async function start(){
    try {
        await mongoose.connect(connectionString);
        console.log('Database is connected');
        
    } catch (error) {
        console.error(`Database connection failed : ${error}`);
    }
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session)
    app.get('/', (req, res) => {
        res.json({message: 'REST service is operational'});
    });

    app.use('/users', authController)
    app.use('/book/catalog', bookController);

    app.listen(port, () => console.log(`Rest service is listening on port ${port}`));
}

