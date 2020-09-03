const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const config=require('./config/database);
const bucketlist=require('./Controller/control');
mongoose.connect(config.database);
const port=1234;
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
	res.send("Invalid page");
})
app.use('/bucketlist',bucketlist);
app.listen(port,()=>
{
	console.log('Server is up and running on port number ' + port);
});