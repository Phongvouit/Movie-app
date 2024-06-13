const express = require("express")
const { addToLikeMovies, getLikedMovies } = require("../controllers/UserController")
const router = express.Router()

router.post("/add", addToLikeMovies)
router.get("/liked/:email", getLikedMovies)

module.exports = router