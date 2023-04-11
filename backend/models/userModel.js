const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String
    },
    tel: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pwd: {
        type: String,
        required: true
    },
    statut: {
        type: String,
        required: true
    }
}, {timestamps: true})

// static singup method
userSchema.statics.singup = async function(name, tel, email, pwd, statut) {

    // Validator 
    if(!email || !pwd) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(pwd)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email is already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pwd, salt)

    const user = await this.create({ name, tel, email, pwd: hash, statut })

    return user

}

// static login method
userSchema.statics.login = async function(email, pwd) {

    if(!email || !pwd) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(pwd, user.pwd)

    if(!match) {
        throw Error('Incorrect Password')
    }

    return user

}

module.exports = mongoose.model('User', userSchema)