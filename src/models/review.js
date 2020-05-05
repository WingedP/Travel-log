const mongoose=require("mongoose");


const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Tour's name is required"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "Tour's review is required"],
        trim: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,     
        ref: "User",
        required: [true, "Review's writer is required"]
    },
    tour: {
        type: mongoose.Schema.ObjectId,     
        ref: "Tour",
        required: [true, "Review's tour is required"]
    },
    rating: {
        type: Number,
        required: [true, "Review needs a rating"],
        min: 1,
        max: 5
      }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// schema.pre(/^find/, function (next) {
//     this.populate("tour", "title")
//     next();});

//new stuff here: //FUNCTION FOR CALCULATING RATING~~~~~ somehow it worked without receiving tour data?
schema.statics.calculateAvgRating = async function(tourId){
const stats= await this.aggregate([
{$match:{ tour: tourId }}, //eg.found 5 docs
{$group: {  
_id: "$tour", //grab the value from $match   
ratingQuantity: {$sum:1}, //5docs
ratingAverage: {$avg: "$rating"}
} }
])
console.log("STATS here ====", stats)
// console.log("TOUR (from models/  tour) here ====", tour)
//fix here:  cyclic dependency
await mongoose.model("Tour").findByIdAndUpdate(tourId,{
    ratingAverage: stats.length===0 ? 0 : stats[0].ratingAverage,
    ratingQuantity: stats.length===0 ? 0 : stats[0].ratingQuantity
})
}

// //use doc middleware pre save: 
//UPDATE RATING WHEN CREATED?
schema.post("save",function(next){
    console.log("schema.POST save review.js RUNNING")
    this.constructor.calculateAvgRating(this.tour)
})

//UPDATE RATING WHEN DELETE/UPDATE?
schema.pre(/^findOneAnd/,async function(next){ 
this.doc = await this.findOne();
next()
})  
schema.post(/^findOneAnd/,async function(){
this.doc.constructor.calculateAvgRating(this.doc.tour)
})

//new stuff here:


const Review = mongoose.model("Review", schema);
module.exports = Review;  