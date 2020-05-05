const mongoose=require("mongoose");
const validator=require("validator");    
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//SET UP AUTHENTICATION FOR USER/ORGANIZER with email,name,password,tokens
const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "USER must have a name"],
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: [true, "USER must have an email"],
        trim: true,
        unique: true,
        lowercase: true,        
        validate:{
            validator: function(value){
        return validator.isEmail(value);
            }
        }
    },
    password: {
        type: String,   
        required: [true, "USER must have a password"]
  },
  tokens: [String] 
}, {
    timestamps: true
});


schema.statics.loginWithCredentials=async (email,password)=>{
    const user=await User.findOne({email:email});
    if(!user) throw new Error("USER not found");
    const allow = await bcrypt.compare(password.toString(),user.password);
    console.log("YOUR EMAIL",email,"YOUR PASSWORD",password)
    if(!allow) throw new Error("incorrect password")
    return user
}   

schema.methods.generateToken=async function(){
const jsonToken=jwt.sign({email:this.email,id:this._id},process.env.SECRET);
this.tokens.push(jsonToken);
await this.save();
return jsonToken
}

schema.methods.toJSON = function () {
    let newObj=this.toObject();
    delete newObj.password;
    delete newObj.__v;
    return newObj;
};


schema.pre('save',async function(next) {
if (!this.isModified("password")) return next();
this.password = await bcrypt.hash(this.password, saltRounds);
next();
});

schema.pre("findOneAndUpdate", async function (next){ 
    if (!this._update.password) return next(); 
    this._update.password = await bcrypt.hash(this._update.password.toString(), saltRounds);
    next();
})
    
const User=mongoose.model('User',schema);
module.exports=User
