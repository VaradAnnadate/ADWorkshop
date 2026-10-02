const express = require('express')
const productsRouter = require('./routes/products')

const app = express()
const port = 3000

app.use(express.json())
app.use('/products', productsRouter)

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
