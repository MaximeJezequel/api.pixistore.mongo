// Import router: const myRouter = require('./myRoute')
const productsRouter = require("./products")

// add your middleware route: app.use('url', myRouter)
const setupRoutes = (app) => {
	app.use("/products", productsRouter)
}

module.exports = { setupRoutes }
