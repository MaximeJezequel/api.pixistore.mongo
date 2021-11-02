const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
// const multer = require("multer")
const { setupRoutes } = require("./routes")
const client = require("./db-config.js")
const app = express()

// Declare port
const port = process.env.PORT || 4000

// Route middleware
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/public"))

// Test connection
client
	.connect()
	.then(console.log("Connected to Database (MongoDB)"))
	.catch(console.error)

// Root
app.get("/", (req, res) => {
	res.status(200).send("Salut Pixilive ! Welcome home !")
})

// Redirection
setupRoutes(app)

// Test if server is running
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
