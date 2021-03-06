const User = require("../models/user");
const {updateOne}= require("./factories");


exports.createUser = async function (req, res) {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        return res.status(201).json({ status: 'Successfully created USER', data: user })
    } catch (err) {
        return res.status(400).json({ status: "fail to create USER", error: err.message })
    }
}

exports.readUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: "successfully show ALL USERS!", data: users });
    } catch (error) {
        res.status(400).json({ status: "fail to show ALL USERS!", message: error.message });
    };
};

exports.readSingleUser = async (req, res) => {
    try {
        const {uId} = req.params;
        const singleUser = await User.findById(uId);
        res.status(200).json({ status: "successfully show USER!", data: singleUser });
    } catch (error) {
        res.status(400).json({ status: "fail to show USER!", message: error.message });
    };
};

exports.deleteUser = async (req, res) => {
    const { uId } = req.params;
    try {
        await User.findByIdAndDelete(uId)
        return res.status(204).json({ status: "Successfully deleted USER", data: null })
    }
    catch (er) {
        return res.status(400).json({ status: "failed to delete USER", error: err.message })
    }
}

exports.updateUser=updateOne(User)

// exports.updateUser=async(req,res)=>{
//     const {uId}=req.params;
//     try{
//     const user=await User.findByIdAndUpdate(uId,{name:req.body.name},{new:true})
//     return res.status(200).json({status:"ok",data:user})
// }   
//     catch(er){
//     return res.status(400).json({status:"failed",error:err.message})   
//     }
// }