const productsRouter = require("express").Router()
const client = require("../db-config.js")
const Products = require("../models/products")

/*************************************************/
/*                   MY ROUTES                   */
/*************************************************/

// *********************************************************************************
// Read All products (route)
productsRouter.get("/", (req, res) => {
	Products.findAllProducts(client)
		.then((products) => {
			res.status(200).json(products)
		})
		.catch((err) => {
			console.log(err)
			res.status(500).send("Error Server")
		})
})
// Read product by id (route)
productsRouter.get("/:id", (req, res) => {
	const product_id = req.params.id
	Products.findOneProductById(client, product_id)
		.then((product) => {
			if (!product) res.status(404).json({ message: `Product not found` })
			else res.status(200).json(product)
		})
		.catch((err) => {
			console.error(err)
			res
				.status(500)
				.json({ message: "Error retrieving product from database" })
		})
})
// *********************************************************************************
// Create product (route)

// In postman
// {
// "product_name": "Photo2",
// "product_desc": "Photo number 2",
// "product_author": "Ohe Studio",
// "product_img": "pic_2.jpg",
// "product_img_mini": "pic_mini_2.jpg",
//  "product_price": {"$numberDecimal": "3.50"},
// "product_quantity": 100,
// "product_upload_date": "2021-10-31T08:25:39.736Z"
// }
productsRouter.post("/", (req, res) => {
	const { product_name } = req.body
	if (!product_name)
		res.status(401).json({ message: "Product name is required" })
	else {
		// Read product by name
		Products.findOneProductByName(client, product_name).then(
			(existingProductName) => {
				if (existingProductName) {
					res.status(401).json({ message: `Product name already exists` })
				} else {
					// console.log("req.body", req.body)
					const newProduct = req.body
					Products.createProduct(client, newProduct)
						.then((createdProduct) =>
							res.status(201).json({
								message: `🎉 Product Created !`,
								product: createdProduct,
							})
						)
						.catch((err) => {
							console.error(err)
							res.status(500).json({ message: "Error saving the product" })
						})
				}
			}
		)
	}
})
// *********************************************************************************
// Update product (route)
productsRouter.put("/:id", (req, res) => {
	const product_id = req.params.id
	Products.findOneProductById(client, product_id).then((existingProductId) => {
		if (!existingProductId) {
			res
				.status(404)
				.json({ message: `Product with id ${product_id} not found.` })
		}
		// console.log("req.body", req.body)
		Products.updateOneProductById(client, product_id, req.body)
			.then(() => {
				res
					.status(200)
					.json({ message: "Product updated !", product: { ...req.body } })
			})
			.catch((err) => {
				console.error(err)
				res.status(500).json({ message: "Error updating a product." })
			})
	})
})
// *********************************************************************************
//Delete product (route)
productsRouter.delete("/:id", (req, res) => {
	const product_id = req.params.id
	Products.findOneProductById(client, product_id).then((existingProductId) => {
		if (!existingProductId) {
			res
				.status(404)
				.json({ message: `Product with id ${product_id} not found.` })
		}
		Products.deleteProductById(client, product_id)
			.then(() => {
				res.status(200).json({ message: `🎉 Product deleted!` })
			})
			.catch((err) => {
				console.log(err)
				res.status(500).json({ message: "Error deleting a product" })
			})
	})
})
// *********************************************************************************
// Important : do not forget to export productsRouter !!
module.exports = productsRouter
