

//TOUR ROUTE:
const router=require("express").Router();
const {auth}=require("../controllers/authControllers");
const { validateCatParams }=require("../middlewares/validate");
const {readTours, readTour,readTourCat, 
createTour, deleteTour, updateTour}=require("../controllers/tourControllers");


router.route("/:cId/tours")
.get(auth, validateCatParams, readTourCat) // read all tours from 1 category

// router.get("/categories/:cId/tours", validateCatParams, readTourCat) //Read tours by category


router.route("/")
.get(readTours) //read all tours
router.route("/:cId").post(auth, validateCatParams, createTour) //create a tour
router.route("/:tId")
.get(readTour) //read a single tour
.delete(auth, deleteTour) //delete a tour
.put(auth, updateTour) //update a tour


module.exports = router;