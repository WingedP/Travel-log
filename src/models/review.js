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

const Review = mongoose.model("Review", schema);
module.exports = Review;  