

class AppError extends Error{
constructor(statusCode, message){
super(message) //super role is to call properties from constructor/parent class
this.statusCode=statusCode;
this.message=message;
this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

this.isOperation=true;
Error.captureStackTrace(this, this.constructor);


}
}

module.exports=AppError;



// //read more here: 
// //https://nodejs.org/api/errors.html#errors_error_capturestacktrace_targetobject_constructoropt
