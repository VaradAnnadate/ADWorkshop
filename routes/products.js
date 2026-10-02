const express = require('express')
const productsController = require('../controllers/productsController')
const { cache, invalidateCache } = require('../middleware/cache')

const router = express.Router()

router.get('/', cache, productsController.getProducts)
router.get('/:id', cache, productsController.getProductById)
router.post('/', invalidateCache, productsController.createProduct)
router.put('/:id', invalidateCache, productsController.replaceProduct)
router.patch('/:id', invalidateCache, productsController.updateProduct)
router.delete('/:id', invalidateCache, productsController.deleteProduct)

module.exports = router