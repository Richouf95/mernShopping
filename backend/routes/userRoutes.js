const express = require('express')
const {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    singupUser
} = require('../controllers/userController')

const router = express.Router()

// GET all user
router.get('/', getAllUsers)

// GET a single user
router.get('/:id', getUser)

// POST a new user
router.post('/', createUser)

// DELETE a user
router.delete('/:id', deleteUser)

// UPDATE a user
router.patch('/:id', updateUser)

            /* 
                *********************
            */

// login
router.post('/login', loginUser)

// signup
router.post('/singup', singupUser)

module.exports = router