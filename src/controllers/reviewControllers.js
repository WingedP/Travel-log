
const Review = require("../models/review");
const Tour = require("../models/tour");


//READ ALL REVIEWS FROM ALL TOURS: 
exports.readAllReviews = async function (req, res){
    try{
        const review = await Review.find();
        const reviewCount = await Review.find().countDocuments();
            res.status(201).json({ status: "success", data: review,reviewCount })
    }catch(error){res.status(400).json({ status: "fail", message: error.message });
    }
}

//READ ALL REVIEWS FROM 1 TOUR: 
exports.readReviews = async function (req, res){
try{   
    const reviewNumPerTour = await Review.find({tour:req.tour._id}).countDocuments();
    // const reviews = await Review.find({tour:req.tour._id})
    // .populate("user","_id name email")
    // .populate("tour","_id title organizer");

    const tour=await Tour.findById(req.tour._id)
    .populate("reviews") .populate("user","_id name email");

    res.status(200).json({ status: "success", numberOfReview:reviewNumPerTour, data: tour})
}catch(error){res.status(500).json({ status: "fail", message: error.message });
}
}

//READ A SINGLE REVIEW: 
exports.readReview = async function (req, res){
try{
  const singleReview = await Review.findOne({_id: req.params.rId})
  res.status(201).json({ status: "success", data: singleReview })
}catch(error){   res.status(400).json({ status: "fail", message: error.message });
}
}

//CREATE A REVIEW: 
exports.createReview = async function (req, res) {
    try {
      const review = await Review.create({
        title:req.body.title,
        content:req.body.content,
        rating:req.body.rating,
        tour:req.tour._id,
        user: req.user._id,
  
        })
      res.status(200).json({ status: "Successfully created REVIEW!", data: review })
    } catch (error) {
      res.status(500).json({ status: "Failed to create REVIEW!", message: error.message });
    }
};

  exports.deleteReview = async (req, res) => {
    const { rId } = req.params;
    try {
        await Review.findByIdAndDelete(rId)
        return res.status(204).json({ status: "Successfully deleted REVIEW", data: null })
    }
    catch (er) {
        return res.status(400).json({ status: "failed to delete REVIEW", error: err.message })
}}

//UPDATE A REVIEW:
    exports.updateReview = async (req, res) => {
      const {rId} = req.params;
      try {
        
      const updateReview = await Review.findByIdAndUpdate(rId,{title:req.body.title,content:req.body.content},{new:true})
      return res.status(201).json({ status: "Successfully updated REVIEW", data: updateReview })
      }
      catch (error) {
      return res.status(400).json({ status: "failed to update REVIEW", error:"???" })
      }
}


