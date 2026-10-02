const fs = require('fs/promises')
const path = require('path')

const pathToDB = path.join(__dirname, '..', 'db.json')

async function getProducts() {
    let data = await fs.readFile(pathToDB, 'utf-8')
    return JSON.parse(data)
}

async function saveProducts(products) {
    await fs.writeFile(pathToDB, JSON.stringify(products, null, 2))
}

module.exports = { getProducts, saveProducts }