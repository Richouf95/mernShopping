const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRETE, { expiresIn:'3d' })
}

// GET all user
const getAllUsers = async (req,res) => {
    const user = await User.find({  }).sort({ createdAt: -1 })

    return res.status(200).json(user)
}

// GET a single user
const getUser = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such User'})
    }

    const user = await User.findById({ _id: id })

    if(!user){
        return res.status(404).json({error: 'No such User'})
    }

    return res.status(200).json(user)
}

// POST a new user
const createUser = async (req,res) => {
    const {name, tel, email, pwd, statut} = req.body
    
    try{
        const user = await User.create({name, tel, email, pwd, statut})

        return res.status(200).json(user)
    } catch(err) {
        return res.status(400).json({error: err.message})
    }
}

// DELETE a user
const deleteUser = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such User'})
    }

    const user = await User.findByIdAndDelete({ _id: id })

    if(!user) {
        return res.status(404).json({error: 'No such User'})
    }

    return res.status(200).json(user)
}

// UPDATE a user
const updateUser = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such User'})
    }

    const user = await User.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if(!user) {
        return res.status(404).json({error: 'No such User'})
    }

    return res.status(200).json(user)
}

            /* 
                *********************
            */

// login
const loginUser = async (req, res) => {

    const {email, pwd} = req.body

    try {
        const user = await User.login(email, pwd)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({user, token})
    } catch(err) {
        res.status(400).json({error: err.message})
    }

    // res.json({message: 'Login user'})
}

// singup
const singupUser = async (req, res) => {

    const {name, tel, email, pwd, statut} = req.body

    try {
        const user = await User.singup(name, tel, email, pwd, statut)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({user, token})
    } catch(err) {
        res.status(400).json({error: err.message})
    }

    // res.json({message: 'Singup user'})
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    singupUser
}