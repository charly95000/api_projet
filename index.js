const express= require('express')
const bodyParser= require('body-parser')
const cors = require('cors')

const db= require('./db')
const breveRouter= require('./routes/breve-router')

const app= express()
const apiPort = 8000

const path = require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/',(req, res) => {
    res.send('Hello World!')
})
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use('/api',breveRouter)



app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))