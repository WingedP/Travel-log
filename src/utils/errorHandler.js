

module.exports=function(err,req,res,next){
    err.status=err.status || "error"
    err.statusCode=err.statusCode || "500"
if(err){
return res.status(err.statusCode).json({
    status:err.status,
    message:err.message})};
next();
}