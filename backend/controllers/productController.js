const Product = require('../models/productModel')
const mongoose = require('mongoose')
const cloudinary = require('../utils/cloudInary')

// GET all Product
const getAllProducts = async (req,res) => {
    const product = await Product.find({  }).sort({ createdAt: -1 })

    return res.status(200).json(product)
}

// GET a single Product
const getProduct = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such product'})
    }

    const product = await Product.findById({ _id: id })

    if(!product) {
        return res.status(404).json({error: 'No such product'})
    }

    return res.status(200).json(product)
}

// POST a new Product
const createProduct = async (req,res) => {
    const {name, description, prix, quantite, image, propritaireId, ventes} = req.body

    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: 'ProductImages',
            use_filename: true,
            unique_filname: false
        })

        const product = await Product.create({name, description, prix, quantite, image: {public_id: result.public_id, url: result.secure_url}, propritaireId, ventes})

        return res.status(200).json(product)
    } catch(err) {
        return res.status(400).json({error: err.message})
    }
}

// DELETE a Product
const deleteProduct = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such product'})
    }

    const product = await Product.findByIdAndDelete({_id: id})

    if(!product) {
        return res.status(404).json({error: 'No such product'})
    }

    return res.status(200).json(product)
}

// UPDATE a Product
const updateProduct = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such product'})
    }

    const product = await Product.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!product) {
        return res.status(404).json({error: 'No such product'})
    }

    return res.status(200).json(product)
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}