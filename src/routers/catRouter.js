

const router = require("express").Router();
const {auth}=require("../controllers/authControllers");
const {readCategories, readSingleCategory, createCategory, 
deleteCategory, updateCategory}=require("../controllers/categoryControllers");
const catchAsync=require('../utils/catchAsync')


router.route("/")
.get(readCategories) //read all categories
.post(auth, createCategory) //create a category
router.route("/:cId")
.get(readSingleCategory) //read 1 category
.delete(auth, deleteCategory) //delete 1 category
.put(auth, updateCategory) //update 1 category

router.get("/createcat", catchAsync(async (req, res, next) => {
    const arr = [
      { category: "japan" },
      { category: "russia" },
      { category: "vietnam" },
      { category: "korea" },
      { category: "china" },
      { category: "usa" },
      { category: "thailand" },
      { category: "australia" },
      { category: "asia" },
      { category: "europe" },
      { category: "SEA" }
    ];
    const cates = await Category.insertMany(arr);
    res.json(cates);
  }));


module.exports = router;
