const client = require("../db-config")

/*************************************************/
/*                   MY MODELS                   */
/*************************************************/

// *********************************************************************************
// ******* List all databases *******
async function listDatabases(client) {
	const databasesList = await client.db().admin().listDatabases()
	console.log("Databases:")
	databasesList.databases.forEach((db) => {
		console.log(`- ${db.name}`)
	})
}
// *********************************************************************************
// ******* Insert single listing *******
const createListing = async (client, newListing) => {
	const result = await client
		.db("sample_airbnb")
		.collection("ListingsAndReviews")
		.insertOne(newListing)
	console.log(`New listing created with the following id: ${result.insertedId}`)
}
// ******* Insert multiple listings *******
const createMultipleListings = async (client, newListings) => {
	const result = await client
		.db("sample_airbnb")
		.collection("ListingsAndReviews")
		.insertMany(newListings)
	console.log(
		`${result.insertedCount} new listings created with the following id(s):`
	)
	console.log(result.insertedIds)
}
// *********************************************************************************
// ******* Find single listing by name *******
const findOneListingByName = async (client, nameOfListing) => {
	const result = await client
		.db("sample_airbnb")
		.collection("ListingsAndReviews")
		.findOne({ name: nameOfListing })
	if (result) {
		console.log(
			`Found a listing in the collection with the name ${nameOfListing}`
		)
		console.log(result)
		return result
	} else {
		console.log(`No listing found with the name ${nameOfListing}`)
	}
}
// ******* Find all listings *******
const findAllListings = async (client) => {
	const cursor = await client
		.db("sample_airbnb")
		.collection("ListingsAndReviews")
		.find()

	const results = await cursor.toArray()

	if (results.length > 0) {
		console.log(`Found ${results.length} listing(s) in the collection`)
		console.log(results)
		return results
	} else {
		console.log(`No listing found in the collection`)
	}
}
// ******* Find multiple listings by name *******
const findMultipleListingByName = async (
	client,
	{ nameOfListing, bedroomsNumber } = {}
) => {
	const cursor = await client
		.db("sample_airbnb")
		.collection("ListingsAndReviews")
		.find({ name: nameOfListing }, { bedrooms: bedroomsNumber })

	const results = await cursor.toArray()

	if (results.length > 0) {
		console.log(
			`Found ${results.length} listing(s) with name: ${nameOfListing}`
		)
		results.forEach((result, i) => {
			console.log()
			console.log(`${i + 1}. name: ${result.name}`)
			console.log(`   _id: ${result._id}`)
			console.log(`   bedrooms: ${result.bedrooms}`)
			console.log(`   bathrooms: ${result.bathrooms}`)
		})
	} else {
		console.log(`No listings found with name: ${nameOfListing}`)
	}
}
// ******* Find multiple listings with minimum bedrooms & bathrooms *******
const findListingWithMinimumBedroomsBathroomsAndMostRecentReviews = async (
	client,
	{
		minimumNumberOfBedrooms = 0,
		minimumNumberOfBathrooms = 0,
		maximumNumberOfResults = Number.MAX_SAFE_INTEGER,
	} = {}
) => {
	const cursor = await client
		.db("sample_airbnb")
		.collection("ListingsAndReviews")
		.find({
			bedrooms: { $gte: minimumNumberOfBedrooms },
			bathrooms: { $gte: minimumNumberOfBathrooms },
		})
		.sort({ last_review: -1 })
		.limit(maximumNumberOfResults)

	const results = await cursor.toArray()
	if (results.length > 0) {
		console.log(
			`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`
		)
		results.forEach((result, i) => {
			date = new Date(result.last_review).toDateString()
			console.log()
			console.log(`${i + 1}. name: ${result.name}`)
			console.log(`   _id: ${result._id}`)
			console.log(`   bedrooms: ${result.bedrooms}`)
			console.log(`   bathrooms: ${result.bathrooms}`)
			console.log(
				`   most recent review date: ${new Date(
					result.last_review
				).toDateString()}`
			)
		})
	} else {
		console.log(
			`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`
		)
	}
}
// *********************************************************************************
// ******* Update single listing by name *******
const updateListingByName = async (client, nameOfListing, updatedListing) => {
	const result = await client
		.db("sample_airbnb")
		.collection("ListingsAndReviews")
		.updateOne({ name: nameOfListing }, { $set: updatedListing })

	console.log(`${result.matchedCount} document(s) matched the query criteria`)
	console.log(`${result.modifiedCount} document(s) was/were updated`)
}
// ******* Update multiple listings with no property_type *******
const updateAllListingsToHavePropertyType = async (client) => {
	const result = await client
		.db("sample_airbnb")
		.collection("ListingsAndReviews")
		.updateMany(
			{ property_type: { $exists: false } },
			{ $set: { property_type: "Unknown" } }
		)
	console.log(`${result.matchedCount} document(s) matched the query criteria.`)
	console.log(`${result.modifiedCount} document(s) was/were updated.`)
}
// ******* Upsert (update or insert if !exists) => findOne + updateOne || insertOne*******
const upsertListingByName = async (client, nameOfListing, updatedListing) => {
	const result = await client
		.db("sample_airbnb")
		.collection("ListingsAndReviews")
		.updateOne(
			{ name: nameOfListing },
			{ $set: updatedListing },
			{ upsert: true }
		)
	console.log(`${result.matchedCount} document(s) matched the query criteria`)
	if (result.upsertedCount > 0) {
		console.log(`One document was inserted with the id ${result.upsertedId}`)
	}
	console.log(`${result.modifiedCount} document(s) was/were updated`)
}

module.exports = {
	listDatabases,
	createListing,
	createMultipleListings,
	findOneListingByName,
	findAllListings,
	findMultipleListingByName,
	findListingWithMinimumBedroomsBathroomsAndMostRecentReviews,
	updateListingByName,
	updateAllListingsToHavePropertyType,
	upsertListingByName,
}
