const productsService = require('../services/productsService')
const { saveCache } = require('../middleware/cache')

async function getProducts(req, res, next) {
    try {
        let products = await productsService.getProducts()
        saveCache(req, products)
        res.json(products)
    } catch (err) {
        next(err)
    }
}

async function getProductById(req, res, next) {
    try {
        let product = await productsService.getProductById(req.params.id)
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        saveCache(req, product)
        res.json(product)
    } catch (err) {
        next(err)
    }
}

async function createProduct(req, res, next) {
    try {
        if (!req.body || typeof req.body.name !== 'string' || typeof req.body.price !== 'number') {
            return res.status(400).json({ error: 'Name and numeric price are required' })
        }
        let product = await productsService.createProduct(req.body)
        res.status(201).json(product)
    } catch (err) {
        next(err)
    }
}

async function replaceProduct(req, res, next) {
    try {
        if (!req.body || typeof req.body.name !== 'string' || typeof req.body.price !== 'number') {
            return res.status(400).json({ error: 'Name and numeric price are required' })
        }
        let product = await productsService.replaceProduct(req.params.id, req.body)
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        res.json(product)
    } catch (err) {
        next(err)
    }
}

async function updateProduct(req, res, next) {
    try {
        let data = req.body
        if (!data || typeof data !== 'object' || Array.isArray(data) || Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'At least one product field is required' })
        }
        if (data.name !== undefined && typeof data.name !== 'string') {
            return res.status(400).json({ error: 'Name must be a string' })
        }
        if (data.price !== undefined && typeof data.price !== 'number') {
            return res.status(400).json({ error: 'Price must be a number' })
        }
        let product = await productsService.updateProduct(req.params.id, data)
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        res.json(product)
    } catch (err) {
        next(err)
    }
}

async function deleteProduct(req, res, next) {
    try {
        let product = await productsService.deleteProduct(req.params.id)
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        res.json(product)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    replaceProduct,
    updateProduct,
    deleteProduct
}