require("dotenv").config()
const { MongoClient } = require("mongodb")

// MongoDB Url & parameters
const connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

const atlas_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(atlas_url, connectionParams)

module.exports = client
