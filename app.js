const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');


const router = require('./students')
const app = express();
const port = 5050;
app.use(bodyParser.json());


const url = 'mongodb://localhost:27017'
const dbName = 'school';
let db = null;


// Connect to MongoDB-
const connectToDb = async (req, res, next) => {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    console.log("Mongodb connected successfully");
    return db;
};


app.use(bodyParser.json());


connectToDb().then((database)=>{
    app.use((req, res, next) =>{
        req.db = database;
        next();
    })
    // User routes-
    app.use('/api', router);
}).catch((error) =>{
    console.error('Failed to connect to MongoDB', error);
})


// App listen-

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});