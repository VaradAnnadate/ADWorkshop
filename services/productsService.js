const productsDatabase = require('../database/productsDatabase')

async function delayReadData() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500)
    })
    return await productsDatabase.getProducts()
}

async function getProducts() {
    return await delayReadData()
}

async function getProductById(id) {
    let products = await delayReadData()
    return products.find((item) => item.id === Number(id))
}

async function createProduct(data) {
    let products = await productsDatabase.getProducts()
    let id = products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1
    let product = { id, name: data.name, price: data.price }
    products.push(product)
    await productsDatabase.saveProducts(products)
    return product
}

async function replaceProduct(id, data) {
    let products = await productsDatabase.getProducts()
    let index = products.findIndex((item) => item.id === Number(id))
    if (index === -1) {
        return null
    }
    let product = { id: Number(id), name: data.name, price: data.price }
    products[index] = product
    await productsDatabase.saveProducts(products)
    return product
}

async function updateProduct(id, data) {
    let products = await productsDatabase.getProducts()
    let index = products.findIndex((item) => item.id === Number(id))
    if (index === -1) {
        return null
    }
    let product = { ...products[index], ...data, id: Number(id) }
    products[index] = product
    await productsDatabase.saveProducts(products)
    return product
}

async function deleteProduct(id) {
    let products = await productsDatabase.getProducts()
    let index = products.findIndex((item) => item.id === Number(id))
    if (index === -1) {
        return null
    }
    let product = products.splice(index, 1)[0]
    await productsDatabase.saveProducts(products)
    return product
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    replaceProduct,
    updateProduct,
    deleteProduct
}