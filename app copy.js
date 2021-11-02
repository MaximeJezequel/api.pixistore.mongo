require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
// const multer = require("multer")
const { setupRoutes } = require("./routes")
const app = express()

// Declare variables
const port = process.env.PORT || 4000
const db_user = process.env.DB_USER
const db_password = process.env.DB_PASSWORD
const db_host = process.env.DB_HOST
const db_name = process.env.DB_NAME

// MongoDB Url & parameters
const atlas_url = `mongodb+srv://${db_user}:${db_password}@${db_host}/${db_name}?retryWrites=true&w=majority`
const connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

// Test connection MongoDB
const db = mongoose
	.connect(atlas_url, connectionParams)
	.then(() => {
		console.log("Connected to database")
	})
	.catch((err) => {
		console.error(`Error connecting to the database. \n${err}`)
	})

// Test connection MySQL
// connection.connect((err) => {
// 	if (err) {
// 		console.error("error connecting: " + err.stack)
// 	} else {
// 		console.log("connected to database with threadId :  " + connection.threadId)
// 	}
// })

//multer storage
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "./public/images")
// 	},
// 	filename: (req, file, cb) => {
// 		console.log("file", file)
// 		cb(null, file.originalname)
// 	},
// })

//multer upload
// const upload = multer({
// 	storage: storage,
// })

// app.post(
// 	"/upload",
// 	upload.fields([{ name: "product_img" }, { name: "product_img_mini" }]),
// 	(req, res) => {
// 		res.status(200).json("Uploaded")
// 	}
// )

// Route middleware
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
	res.status(200).send("Salut Pixilive ! Welcome home !")
})

setupRoutes(app)

// Test if server is running
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

module.exports = db
