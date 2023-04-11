const express = require('express')
const {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

// require auth for all product routes
router.use(requireAuth)

// GET all Product
router.get('/', getAllProducts)

// GET a single Product
router.get('/:id', getProduct)

// POST a new Product
router.post('/', createProduct)

// DELETE a Product
router.delete('/:id', deleteProduct)

// UPDATE a Product
router.patch('/:id', updateProduct)


module.exports = router