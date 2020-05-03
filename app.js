const express=require("express");
require("dotenv").config();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const {auth, login, logout}=require("./src/controllers/authControllers");
const {validateTour, validateCatParams, validateReview}=require("./src/middlewares/validate");



mongoose.connect(process.env.DB_LOCAL,{
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true 
}).then(()=>console.log("successfully connected to ur database!")).catch(err=>console.log(err))

const app=express();
const router=express.Router();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(router);

//HOME ROUTE:
router.get("/",(req,res)=>{
res.status(200).json({status:"HOME ROUTE OK", data:[]})
})

//TOUR ROUTE:
const {readTours, readTour,readTourCat, createTour, deleteTour, updateTour}=require("./src/controllers/tourControllers");
router.route("/categories/:cId/tours")
.get(auth, validateCatParams, readTourCat) // read all tours from 1 category
router.route("/tours")
.get(readTours) //read all tours
router.route("/tours/:cId").post(auth, validateCatParams, createTour) //create a tour
router.route("/tours/:tId")
.get(readTour) //read a single tour
.delete(auth, deleteTour) //delete a tour
.put(auth, updateTour) //update a tour


//REVIEW ROUTE:
const {createReview,readAllReviews, readReviews,readReview, deleteReview, updateReview}=require("./src/controllers/reviewControllers");
router.route("/reviews").get(readAllReviews) // read all reviews from all tours
router.route("/tours/:tId/reviews") 
.get(auth, validateTour, readReviews) // read all reviews from a single tour
.post(auth, validateTour, createReview) // create a review for a tour
router.get("/tours/:tId/reviews/:rId",validateTour, validateReview, readReview) // read a single review

router.route("/reviews/:rId") 
.delete(auth, deleteReview) // delete a single review
.put(auth, updateReview) // update a single review

//CATEGORY ROUTE: DONE.
const {readCategories, readSingleCategory, createCategory, deleteCategory, updateCategory}=require("./src/controllers/categoryControllers");
router.route("/categories")
.get(readCategories) //read all categories
.post(auth, createCategory) //create a category
router.route("/categories/:cId")
.get(readSingleCategory) //read 1 category
.delete(auth, deleteCategory) //delete 1 category
.put(auth, updateCategory) //update 1 category

//USER/ORGANIZER ROUTE:
const {createUser, readUsers, readSingleUser, deleteUser, updateUser}=require("./src/controllers/userControllers");
router.route("/users")
.post(auth,createUser)
.get(readUsers)
router.route("/users/:uId")
.get(readSingleUser)
.delete(auth,deleteUser)
.put(auth,updateUser)

//AUTHENTICATION/LOGIN/LOGOUT ROUTES:
router.route("/auth/login")
.post(login)  
router.get("/auth/logout", auth, logout);




app.listen(process.env.PORT,()=>{
    console.log("App is running on PORT",process.env.PORT)
});
