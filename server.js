const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const mongodb = require('./config/db');
const Router = require('./routes/AuthRoute');
const todoRoute = require('./routes/TodoRoutes');


//^env configuration
dotenv.config()

//^mongodb connection
mongodb()


let app = express()

// app.use(Router)
//^middleware
// app.use(Router)
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/v1', Router)
app.use('/api/v1/todo', todoRoute)

// app.use('*',(req,res)=>{
//     return res.send({error:true,message:error.message})
// })


let PORT = process.env.PORT || 5000
app.get('/', (req, res) => {
    res.status(200).send('<h1>this is home page</h1>')
})

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`.bgBlue.blue);
})