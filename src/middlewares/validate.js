const Tour=require("../models/tour");
const Category=require("../models/category");
const Review=require("../models/review");



exports.validateTour = async function (req,res,next){
    const tourId=req.params.tId;
    try{const tour= await Tour.findById(tourId);
    if(!tour) return res.status(404).json({status:"failed to get TOUR ID", error:"ERROR!"});
    req.tour=tour;
    next()}catch(error){return res.status(500).json({status:"failed to get TOUR ID", error: err.message});}

}

// async function validateCat(req,res,next){
//     const {catId}=req.body;
//     try{const cat= await Category.findById(catId);
//     if(!cat) return res.status(404).json({status:"failed to get CATEGORY ID", error:"ERROR!"});
//     req.cat=cat;
//     next()}catch(error){return res.status(500).json({status:"failed to get CATEGORY ID", error: "too bad"});}
// }


exports.validateCatParams= async function (req,res,next){
    const catId=req.params.cId;
    try{const cat= await Category.findById(catId);
    if(!cat) return res.status(404).json({status:"failed to get CATEGORY ID", error:"ERROR!"});
    req.cat=cat;
    next()}catch(error){return res.status(500).json({status:"failed to get CATEGORY ID", error: "too bad"});}
}

exports.validateReview= async function (req,res,next){
    const reviewId=req.params.rId;
    try{const review= await Review.findById(reviewId);
    if(!review) return res.status(404).json({status:"failed to get REVIEW ID", error:"ERROR!"});
    req.review=review;
    next()}catch(error){return res.status(500).json({status:"failed to get REVIEW ID", error: "too bad"});}
}



// module.exports = validateTour;
// // module.exports = validateCat;
// module.exports = validateCatParams;