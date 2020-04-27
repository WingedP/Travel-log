const express=require("express");
require("dotenv").config();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const {auth, login, logout}=require("./src/controllers/authControllers");
const {validateTour, validateCatParams, validateReview}=require("./src/middlewares/validate");
// const validateCat=require("./src/middlewares/validate");



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
const {readTours, readTour,readTourCat, createTour, deleteTour}=require("./src/controllers/tourControllers");
router.route("/categories/:cId/tours")
.get(auth, validateCatParams, readTourCat) //READ ALL TOURS from 1 CATEGORY: DONE
router.route("/tours")
.get(readTours) //READ ALL TOURS: DONE
router.route("/tours/:cId").post(auth, validateCatParams, createTour) //CREATE TOUR: DONE
router.route("/tours/:tId")
.get(readTour) //READ SINGLE TOUR: DONE
.delete(auth, deleteTour) 

//REVIEW ROUTE:
const {createReview,readAllReviews, readReviews,readReview, deleteReview, updateReview}=require("./src/controllers/reviewControllers");
router.route("/reviews").get(readAllReviews) //READ ALL REVIEWS FROM ALL TOURS
router.route("/tours/:tId/reviews") 
.get(auth, validateTour, readReviews) //READ ALL REVIEWS FROM A SINGLE TOUR
.post(auth, validateTour, createReview) //CREATE REVIEW
router.get("/tours/:tId/reviews/:rId",validateTour, validateReview, readReview) //READ A SINGLE REVIEW
router.delete("/reviews/:id", deleteReview)
router.put("/reviews/:id",updateReview)

//CATEGORY ROUTE: DONE.
const {readCategories, createCategory, deleteCategory, updateCategory}=require("./src/controllers/categoryControllers");
router.route("/categories")
.get(readCategories)
.post(auth, createCategory)
router.delete("/categories/:cId",auth, deleteCategory)
router.put("/categories/:cId",auth, updateCategory)

//USER/ORGANIZER ROUTE:
const {createUser, readUsers, deleteUser, updateUser}=require("./src/controllers/userControllers");
router.route("/users")
.post(createUser)
.get(readUsers)
router.delete("/users/:id", deleteUser)
router.put("/users/:id",updateUser)


//AUTHENTICATION/LOGIN/LOGOUT ROUTES:
router.route("/auth/login")
.post(login)  
router.get("/logout", auth, logout);






app.listen(process.env.PORT,()=>{
    console.log("App is running on PORT",process.env.PORT)
});
