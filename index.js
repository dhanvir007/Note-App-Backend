const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/dbConnection');
 

connectDB();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}))

 

app.use("/api/user",require('./routes/userRoute'));

app.use("/api/notes",require('./routes/noteRoute'));

app.listen(port,()=>{
    console.log( "Server is Started :",port)
})