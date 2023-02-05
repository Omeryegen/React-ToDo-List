const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const {Task, User} = require('./database')
const dotenv = require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt")
const saltRound = 10
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery', true)
const port = process.env.PORT


app.use(cors());
app.use(express.json());


app.get('/todos/:email',  (req,res) => {
    Task.find({email: req.params.email})
        .then((data) => res.json(data))
        .catch(err => res.json({error: "You have got an error"})) 
});

app.post('/todos', async (req, res) =>{
    const {email, progress, date, title} = req.body
    const newTask = new Task({
        id: uuidv4(),
        email,
        progress,
        date,
        title
    });
    
    newTask.save()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json({error: "Please fill all blank parts!"}))
});

app.put('/todos', async (req, res) =>{
    const {email, progress, date, title, id} = req.body
    const newTask = {
        progress,
        date,
        title
    };
    
    const response = await Task.updateOne({id:id}, newTask);
    if(response.modifiedCount !== 1){
        res.json({error: "Something went wrong!"})
    }else{
        res.json(response);
    } 
});



app.delete('/todos' , (req,res) =>{
    const {id} = req.body
    
    Task.remove({id:id}, (err, docs) =>{
        if(err){
            res.json({error: "Something went wrong!"})
        }else{
            res.json(docs)
        }    
    });
   
});

app.post('/login', async (req,res) =>{
    const{password, email} = req.body
    const user =  await User.exists({email: email})
    if(user){
        try{
            const data = await User.find({email:email})
            const success = await bcrypt.compare(password, data[0].password)
            if(success){
                const token = jwt.sign({email}, 'secret', {expiresIn: "10min"})
                res.status(200).json({email: email, token:token})
            }else{
                res.status(400).json({details: "Error"})
            }
        }catch (error){
            res.status(400).json({detail: "Wrong happened!"})
        }
    }else{
        res.status(400).json({detail:"User exists!"})
    }
})

app.post('/register', async (req,res) =>{
    const{password, email} = req.body
    const user =  await User.exists({email: email})
    if(!user){
        bcrypt.genSalt(saltRound, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                const newUser = new User({email: email, password: hash})
                newUser.save()
                    .then(response => {
                        const token = jwt.sign({email}, "secret", {expiresIn: "10min"})
                        res.status(200).json({email, token})
                    })
                    .catch(error => res.status(400).json(error))
            });
        });
    }else{
        res.status(400).json({detail:"User exists!"})
    } 
});

mongoose.connect(process.env.MONGODB)
    .then(response =>{
        app.listen(port, () =>{
            console.log("Listening this port: " + port);
        });
    })
    .catch(err =>{
        console.log(err);
    });
