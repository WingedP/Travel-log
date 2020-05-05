//REVIEW ROUTE:

const router = require("express").Router({mergeParams: true});
const { auth } = require("../controllers/authControllers");
const { validateTour, validateReview } = require("../middlewares/validate");
const { createReview, readAllReviews, readReviews,
    readReview, deleteReview, updateReview } = require("../controllers/reviewControllers");


// router.route("/").get(readAllReviews) // read all reviews from all tours     // it hit this endpoint
// to call the below route, you will use url: /tours/someID/reviews
//like: /tours/:tId/reviews/all
//"/tours/:tId/reviews"
router.route("/all")
.get(auth, readAllReviews)  //read all reviews from all tours

router.route("/")
.get(auth, validateTour, readReviews) // read all reviews from a single tour
.post(auth, validateTour, createReview) // create a review for a tour

router.route("/:rId")
    .get(validateTour, validateReview, readReview) // read a single review
    .delete(auth,validateTour, validateReview, deleteReview) // delete a single review
    .put(auth,validateTour, validateReview, updateReview) // update a single review

module.exports = router;










//backup
// {
// router.route("/reviews").get(readAllReviews) // read all reviews from all tours
// router.route("/tours/:tId/reviews") 
// .get(auth, validateTour, readReviews) // read all reviews from a single tour
// .post(auth, validateTour, createReview) // create a review for a tour
// router.get("/tours/:tId/reviews/:rId",validateTour, validateReview, readReview) // read a single review

// router.route("/reviews/:rId") 
// .delete(auth, deleteReview) // delete a single review
// .put(auth, updateReview) // update a single review    
// }
