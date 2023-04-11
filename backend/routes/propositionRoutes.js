const express = require('express')
const {
    getAllPropositions,
    getProposition,
    createProposition,
    deleteProposition,
    updateProposition
} = require('../controllers/propositionController')

const router = express.Router()


// GET all Proposition
router.get('/', getAllPropositions)

// GET a single Proposition
router.get('/:id', getProposition)

// CREATE a new Proposition
router.post('/', createProposition)

// DELETE a Proposition 
router.delete('/:id', deleteProposition)

// UPDATA a Proposition
router.patch('/:id', updateProposition)

module.exports = router