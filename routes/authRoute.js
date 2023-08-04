const { loginUser} = require("../controllers/authController")
const router = require("express").Router()


router.route("/").post(loginUser)


module.exports = router;