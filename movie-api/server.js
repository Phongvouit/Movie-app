const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRoutes = require("./routes/UserRoutes");
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB Connection Successfull")
})
.catch((error) => {
    console.log(error.message)
})

app.use("/api/user", userRoutes)

app.listen(5000, () => {
    console.log("Server started on port 5000")
})


