const express = require('express');
const router = express.Router();
const User = require('../model/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register
async function register (req,res){

    try{


        
        const {firstname,lastname,email,password} = req.body;
        //check the already emaul exists
        const userObj = await User.findOne({email: new RegExp(`^${email}$`,"i")});

        if(userObj){
            return  res.status(400).json(`Email ${email} already exists`);
        }

        //password hasing
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        console.log("Hash ",hash);
       
        await User.create({
            firstname,
            lastname,
            email,
            password:hash

        })
       res.sendStatus(200);

    }catch(e){
         res.sendStatus(500);
    }

}

//login
async function login(req,res){

    try{
        const {email,password} = req.body;
   
        const isuserExist = await User.findOne({email: new RegExp(`^${email}$`,"i")});

    // console.log("USERSSSS",isuserExist.password);

        if(!isuserExist){
         return   res.status(401).json("Unauthorized Access!");
        }

        // console.log("REAL PW ", isuserExist.password);
        //password check
        const correctPassword = await bcrypt.compare(
            password,
            isuserExist.password

        );

   
        if(!correctPassword){
            return res.status(401).json("Incorrect Password !"); 
            
        }

        //token create
        var token = jwt.sign({ isuserExist: isuserExist._id }, 'Super_secret');
        // console.log(token);
       

        //return res.sendStatus(200);
        return res.status(200).json({
            token,
            fullName: isuserExist.firstname +" "+ isuserExist.lastname

        });
    }catch(e){
        return  res.sendStatus(500);
    }

}

router.post('/register',register); //filename/endponitname
router.post('/login',login)
module.exports = router;