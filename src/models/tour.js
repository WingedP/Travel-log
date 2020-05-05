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
        ref: "Category",
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
    ],
    duration: {
      type: Number,
      required: [true, "Tour must have a duration"],
    },
    price: {
      type: Number,
      required: [true, "Tour must have a price"],
      min: 0
    },
    ratingAverage: {
        type: Number,
        default: 0,
        min: [0, "Rating must be above 0"],
        max: [5, "Rating must be below 5.0"],
        set: value => Math.round(value * 10) / 10
      },
      ratingQuantity: {
        type: Number,
        default: 0
      }
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
      .populate("category","name")
      .populate("guides", "_id name");
    next();
  });


const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;  