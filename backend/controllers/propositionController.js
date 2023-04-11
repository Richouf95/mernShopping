const Proposition = require('../models/propositionModel')
const mongoose = require('mongoose')


// GET all Proposition
const getAllPropositions = async (req,res) => {
    const propositions = await Proposition.find({ }).sort({createdAt: -1})

    res.status(200).json(propositions)
}

// GET a single Proposition
const getProposition = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Proposition'})
    }

    const proposition = await Proposition.findById(id)

    if(!proposition) {
        return res.status(400).json({error: 'No such Proposition'})
    }

    res.status(200).json(proposition)
}

// CREATE a new Proposition
const createProposition = async (req,res) => {

    const {token, command, user_id, totalProposition} = req.body

    try {
        const proposition = await Proposition.create({token, command, user_id, totalProposition})
        res.status(200).json(proposition)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

// DELETE a Proposition 
const deleteProposition = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Proposition'})
    }

    const proposition = await Proposition.findByIdAndDelete({_id: id})

    if(!proposition) {
        return res.status(400).json({error: 'No such Proposition'})
    }

    res.status(200).json(proposition)
}

// UPDATA a Proposition
const updateProposition = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Proposition'})
    }

    const proposition = await Proposition.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!proposition) {
        return res.status(400).json({error: 'No such Proposition'})
    }

    res.status(200).json(proposition)
}

module.exports = {
    getAllPropositions,
    getProposition,
    createProposition,
    deleteProposition,
    updateProposition
}