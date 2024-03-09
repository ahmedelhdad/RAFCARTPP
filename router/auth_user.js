const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const User = require('../models/user')
const { check, validationResult } = require('express-validator')
const authUser =require('../middleware/auth_user')


// Register User
router.post('/register', [
    check('name', "Pleass Enter Name").not().isEmpty(),
    check('email', "Pleass Enter email").isEmail(),
    check('password', "Pleass Enter password more 6").isLength({ min: 6 }),
], async (req, res) => {
    const errros = validationResult(req)
    if (!errros.isEmpty()) {
        return res.json({ errros: errros.array() })
    }
    const { name, email, password,img } = req.body

    try {
        var user = await User.findOne({ email })
        if (user) {
            return res.json({ msg: 'The Account is not registered  ' })
        }
        user = new User({
            name,
            email,
            password,
            img
            
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hashSync(password, salt)
        await user.save()
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload,process.env.JWT_SECTET, { expiresIn: '24h' })
        if (token) {
            return res.json({ token: token })
        }
    } catch (err) {
        return res.json({ msg: 'to fail Register' })
    }
})

// Login User 
router.post('/login',[
    check('email',"Please Enter Email").isEmail(),
    check('password',"Please Enter Password").exists()
],async(req,res) => {
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        return res.json({error:error.array()})
    }
    const {email,password} = req.body
    try
    {
        var user = await User.findOne({email})
        if(!user)
        {
            return res.json({ msg: 'The Account is not registered  ' })
        }
        const isMatach =await bcrypt.compare(password,user.password)
        if(!isMatach)
        {
            return res.json({msg:'Error Password'})
        }
        const payload ={user:{id:user.id}}
        const token = jwt.sign(payload,process.env.JWT_SECTET,{expiresIn:'1h'})
        if(token)
        {
            return res.json({token:token})
        }
    }catch(err)
    {
        return res.json('erro')
    }
})

//Login Get Data User
router.get('/auth',authUser,async(req,res) => {
    try 
    {
        const user = await User.findById(req.user.id).select('-password')
        return res.json(user)
    }catch(err)
    {
        return res.json('problem info')
    }
})
// Data User 
router.get('/data/user',async(req,res) => {
    const users = await User.find().select('-updatedAt').select('-createdAt').select('-password')
   return res.json(users)
})
module.exports = router