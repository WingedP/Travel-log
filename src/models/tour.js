const mongoose = require("mongoose");

//TOUR: title, description, organizer, guide
const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Tour's TITLE is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Tour's DESCRIPTION is required"],
        trim: true,
    },
    category:[{
        type: mongoose.Schema.ObjectId,
        required: [true, "Tour's CATEGORY is required"],
        trim: true,  
    }],
    organizer: {
        type: mongoose.Schema.ObjectId,     
        ref: "User",
        required: [true, "Tour must have an ORGANIZER"]
    },
    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


tourSchema.virtual('reviews', {
    ref: 'Review', 
    localField: '_id', 
    foreignField: 'tour',
  });


tourSchema.pre(/^find/, function (next) {
    this
      .populate("organizer", "-password -__v -tokens -createdAt -updatedAt")
      .populate("guides", "_id name");
    next();
  });


const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;  