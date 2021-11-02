require("dotenv").config()
const { MongoClient } = require("mongodb")

// Declare variables
const db_user = process.env.DB_USER
const db_password = process.env.DB_PASSWORD
const db_host = process.env.DB_HOST
const db_name = process.env.DB_NAME

// MongoDB Url & parameters
const connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

const atlas_url = `mongodb+srv://${db_user}:${db_password}@${db_host}/${db_name}?retryWrites=true&w=majority`
const client = new MongoClient(atlas_url, connectionParams)

module.exports = client
