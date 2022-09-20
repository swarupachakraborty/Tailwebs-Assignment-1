const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const model = require('./userModel');
const middleware = require('./middleware')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://santhosh:12345@backend.sx1ylzc.mongodb.net/test", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use(cors({origin:'*'}))

app.post('/register',async(req,res)=>{
    try {
        let body = req.body
        const {userName,email,passWord,conformPassword} = body
        let exist = await model.findOne({email:email})
        if(exist){
            return res.status(400).send("User already exists")
        }
        if(passWord != conformPassword){
            return res.status(400).send("passwords are not matching")
        }
        let newUser = new model({
            userName,
            email,
            passWord,
            conformPassword
        })
        await newUser.save();
        res.status(201).send('Registered successfully')
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
})

app.post('/login', async(req,res) => {
    try {
        let body = req.body
        const {email,passWord} = body
        let exist = await model.findOne({email})
        if(!exist){
            return res.status(400).send({status:false,message:"User not found"})
        }
        if(exist.passWord != passWord){
            return res.status(400).send({status:false,message:"Invalid credentials"})
        }
        let payload = {
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
            (err,token) => {
                if(err) throw err;
                return res.json({token})
            })
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
})

app.get('/myProfile', middleware, async(req,res) => {
    try {
        let exist = await model.findById(req.user.id)
        if(!exist) {
            return res.status(400).send({status:false,message:"User not found"})
        }
        return res.json(exist)
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
})
app.listen(5000, () => console.log("server is running on port 5000"))