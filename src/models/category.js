const mongoose=require("mongoose");

const catSchema=mongoose.Schema({
    name:{
        type:String,
        require:[true,"Category's name is required"],
        trim:true,
        unique:true,
    }
})

const Category=mongoose.model('Category',catSchema)
module.exports=Category