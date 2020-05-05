const express=require("express");
require("dotenv").config();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const {validateTour, validateCatParams, validateReview}=require("./src/middlewares/validate");
// // import routers
const tourRouter = require("./src/routers/tourRouter");
const reviewRouter = require("./src/routers/reviewRouter");
const userRouter = require("./src/routers/userRouter");
const catRouter = require("./src/routers/catRouter");
const authRouter = require("./src/routers/authRouter");


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

// // RUNNING ROUTERS HERE:
router.use("/categories", catRouter);
router.use("/tours", tourRouter);
router.use("/tours/:tId/reviews", reviewRouter);

router.use("/users", userRouter);
router.use("/auth", authRouter)

router.get("/",(req,res)=>{res.status(200).json({status:"HOME ROUTE OK", data:[]})})

// const AppError=require("./ultils/appError")
// 404 handler
const AppError=require('./src/utils/appError');
function notFound(req, res, next) {
next(new AppError("404","API NOT FOUND"))
}
router.route("*").all(notFound)

//ERROR HANDLERS to capture all errors
const errorHandler=require('./src/utils/errorHandler');
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log("App is running on PORT",process.env.PORT)
});
