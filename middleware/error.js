class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }

}

export const errMiddleware=(err,req,res,next)=>{
        err.message = err.message || "Internal Server Error!";
        err.statusCode = err.statusCode || 500;

        return res.status(err.statusCode).json(
            { 
                message:err.message,
                success:false
    
    });
}

export default ErrorHandler;