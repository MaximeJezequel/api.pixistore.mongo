const productsRouter = require("express").Router()
const client = require("../db-config.js")
const Products = require("../models/products")

// List all collections
productsRouter.get("/list", (req, res) => {
	Products.listDatabases(client)
		.then((product) => {
			res.status(200).json(product)
		})
		.catch((err) => {
			console.log(err)
			res.status(500).send("Error Server")
		})
})

// Read All products (route)
productsRouter.get("/all", (req, res) => {
	Products.findAllListings(client)
		.then((product) => {
			res.status(200).json(product)
		})
		.catch((err) => {
			console.log(err)
			res.status(500).send("Error Server")
		})
})

// productsRouter.get("/", (req, res) => {
// 	Products.findOneListingByName(client, "Lovt Nantes")
// 		.then((product) => {
// 			res.status(200).json(product)
// 		})
// 		.catch((err) => {
// 			console.log(err)
// 			res.status(500).send("Error Server")
// 		})
// })

module.exports = productsRouter
