const express = require("express")
const { addToLikeMovies } = require("../controllers/UserController")
const router = express.Router()

router.post("/add", addToLikeMovies)

module.exports = router