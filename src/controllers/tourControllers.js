
const Tour = require("../models/tour");
const Category = require("../models/category");


//DONE: CREATE TOUR: route: {{url}}/tours/cId --- //example:{{url}}/tours/5ea2d090c0a6960f60505554
exports.createTour = async function (req, res) {
    try {
      const tour = await Tour.create({ ...req.body,
        title: req.body.title,
        guides: req.body.guides,  
        description: req.body.description,
        category:req.cat._id,
        organizer: req.user._id });
      res.status(201).json({ status: "Successfully CREATED TOUR!", data: tour });
    } catch (err) {
      res.status(400).json({ status: "fail to CREATE TOUR", message: err.message });
    };
  };
//DONE: READ ALL TOURS: route: {{url}}/tours/
exports.readTours = async function (req, res) {
    try {
      const tours = await Tour.find({});
      const toursCount = await Tour.find({}).countDocuments();
      res.json({ status: "success",toursCount:toursCount, data:tours });
    } catch (error) {
      res.status(400).json({ status: "fail", message: error.message });
    }
  };
//DONE: READ SINGLE TOUR: route: {{url}}/tours/tId
exports.readTour = async (req, res) => {
    try {
      const { tId } = req.params;
      const tour = await Tour.findById(tId)
      if (!tour) return res.status(404).json({ status: "fail", message: "Tour not found" });
      res.json({ status: "success", data: tour });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err.message });
    };
  };
//DONE: DELETE SINGLE TOUR: route: {{url}}/tours/tId
  exports.deleteTour = async (req, res) => {
    const { tId } = req.params;
    try {
      const tour = await Tour.findByIdAndDelete(tId)
      if (!tour) return res.status(204).json({ status: "Successfully deleted TOUR", data: null })
    }
    catch (error) {
        return res.status(400).json({ status: "failed to delete TOUR", error: "Can't delete TOUR" })
    }
}

//READ ALL TOURS by CATEGORY: //ALL TOURS FROM 1 CAT 
//added cId into params: 
//route: {{url}}/categories/cId/tours/ 
//example:{{url}}/categories/5ea2d10488cef31ed4333499
exports.readTourCat = async (req, res) => {
    try {
      const tours = await Tour.find({category:req.cat._id});
      const toursCount = await Tour.find({category:req.cat._id}).countDocuments();
      if (!tours) return res.status(404).json({ status: "fail", message: "Tour not found" });
      res.json({ status: "success",toursCount:toursCount, data: tours });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err.message });
    };
  };



