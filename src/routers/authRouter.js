

//AUTHENTICATION/LOGIN/LOGOUT ROUTES:


const {auth, login, logout, logoutAll}=require("../controllers/authControllers");
const router = require("express").Router();

router.route("/login")
.post(login)  
router.get("/logout", auth, logout);
router.get("/logoutAll", auth, logoutAll)

module.exports = router;
