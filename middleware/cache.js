let cache = {}
const cacheTTL = 60 * 1000

function cacheMiddleware(req, res, next) {
    let key = req.url
    let value = cache[key]

    if (value && Date.now() - value.createdAt < cacheTTL) {
        res.set('X-Cache', 'HIT')
        return res.json(JSON.parse(value.data))
    }

    if (value) {
        delete cache[key]
    }

    res.set('X-Cache', 'MISS')
    next()
}

function saveCache(req, data) {
    let key = req.url
    cache[key] = { data: JSON.stringify(data), createdAt: Date.now() }
}

function invalidateCache(req, res, next) {
    res.on('finish', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache = {}
        }
    })
    next()
}

module.exports = { cache: cacheMiddleware, saveCache, invalidateCache }