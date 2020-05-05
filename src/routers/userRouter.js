

//USER/ORGANIZER ROUTE:

const router = require("express").Router();
const {auth}=require("../controllers/authControllers");

const {createUser, readUsers, readSingleUser, deleteUser, 
updateUser}=require("../controllers/userControllers");


router.route("/")
.post(auth,createUser)
.get(readUsers)
router.route("/:uId")
.get(readSingleUser)
.delete(auth,deleteUser)
.put(auth,updateUser)

module.exports = router;
    