const client = require("../db-config")
const ObjectId = require("mongodb").ObjectId

/*************************************************/
/*                   MY MODELS                   */
/*************************************************/

// *********************************************************************************
// ******* Insert single product *******
const createProduct = async (client, newProduct) => {
	const result = await client
		.db("pixistore_db")
		.collection("products")
		.insertOne(newProduct)
	console.log(`New product created with the following id: ${result.insertedId}`)
}
// ******* Insert multiple products *******
const createMultipleProducts = async (client, newProducts) => {
	const result = await client
		.db("pixistore_db")
		.collection("products")
		.insertMany(newProducts)
	console.log(
		`${result.insertedCount} new products created with the following id(s):`
	)
	console.log(result.insertedIds)
}
// *********************************************************************************
// ******* Find all products *******
const findAllProducts = async (client) => {
	const cursor = await client.db("pixistore_db").collection("products").find()

	const results = await cursor.toArray()

	if (results.length > 0) {
		console.log(`Found ${results.length} product(s) in the collection`)
		console.log(results)
		return results
	} else {
		console.log(`No product found in the collection`)
	}
}
// ******* Find single product by id *******
const findOneProductById = async (client, idOfProduct) => {
	const result = await client
		.db("pixistore_db")
		.collection("products")
		.findOne({ _id: ObjectId(idOfProduct) })
	if (result) {
		console.log(`Found a product in the collection with the id ${idOfProduct}`)
		console.log(result)
		return result
	} else {
		console.log(`No product found with the id ${idOfProduct}`)
	}
}
// // ******* Find single product by name *******
const findOneProductByName = async (client, nameOfProduct) => {
	const result = await client
		.db("pixistore_db")
		.collection("products")
		.findOne({ product_name: nameOfProduct })
	if (result) {
		console.log(
			`Found a product in the collection with the name ${nameOfProduct}`
		)
		console.log(result)
		return result
	} else {
		console.log(`No product found with the name ${nameOfProduct}`)
	}
}
// *********************************************************************************
// ******* Update single product by id *******
const updateOneProductById = async (client, idOfProduct, updatedProduct) => {
	const result = await client
		.db("pixistore_db")
		.collection("products")
		.updateOne({ _id: ObjectId(idOfProduct) }, { $set: updatedProduct })

	console.log(`${result.matchedCount} document(s) matched the query criteria`)
	console.log(`${result.modifiedCount} document(s) was/were updated`)
}
// ******* Update single product by name *******
const updateOneProductByName = async (
	client,
	nameOfProduct,
	updatedProduct
) => {
	const result = await client
		.db("pixistore_db")
		.collection("products")
		.updateOne({ name: nameOfProduct }, { $set: updatedProduct })

	console.log(`${result.matchedCount} document(s) matched the query criteria`)
	console.log(`${result.modifiedCount} document(s) was/were updated`)
}
// *********************************************************************************
// ******* Delete single product by id *******
async function deleteProductById(client, idOfProduct) {
	const result = await client
		.db("pixistore_db")
		.collection("products")
		.deleteOne({ _id: ObjectId(idOfProduct) })
	console.log(`${result.deletedCount} product was deleted.`)
}
// ******* Delete single product by name *******
async function deleteProductByName(client, nameOfProduct) {
	const result = await client
		.db("pixistore_db")
		.collection("products")
		.deleteOne({ product_name: nameOfProduct })
	console.log(`${result.deletedCount} product was deleted.`)
}
// *********************************************************************************
module.exports = {
	createProduct,
	createMultipleProducts,
	deleteProductById,
	deleteProductByName,
	findAllProducts,
	findOneProductById,
	findOneProductByName,
	updateOneProductById,
	updateOneProductByName,
}
