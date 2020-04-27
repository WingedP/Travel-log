const Category = require("../models/category");


//DONE: CREATE CAT: route: {{url}}/categories
exports.createCategory = async function (req, res) {
    const { name } = req.body;
    try {
        const category = await Category.create({ name });
        return res.status(201).json({ status: 'Successfully created CATEGORY', data: category })
    } catch (err) {
        return res.status(400).json({ status: "fail to create CATEGORY", error: err.message })
    }
}
//DONE: READ ALL CATS: route: {{url}}/categories
exports.readCategories = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json({ status: "successfully show ALL CATEGORIES!", data: category });
    } catch (error) {
        res.status(400).json({ status: "fail to show ALL CATEGORIES!", message: error.message });
    };
};
//DONE: DELETE CAT: added cId into params: route: {{url}}/categories/5ea2d10488cef31ed4333499
exports.deleteCategory = async (req, res) => {
    const { cId } = req.params;
    try {
        await Category.findByIdAndDelete(cId)
        return res.status(204).json({ status: "Successfully deleted CATEGORY", data: null })
    }
    catch (er) {
        return res.status(400).json({ status: "failed to delete CATEGORY", error: err.message })
    }
}
//DONE: UPDATE CAT: added cId into params: route: {{url}}/categories/5ea2d10488cef31ed4333499
exports.updateCategory = async (req, res) => {
    const {cId} = req.params;
    try {
    const category = await Category.findByIdAndUpdate(cId,{name:req.body.name},{new:true})
    return res.status(201).json({ status: "Successfully updated CATEGORY", data: category })
    }
    catch (error) {
    return res.status(400).json({ status: "failed to update CATEGORY", error:"???" })
    }
}


