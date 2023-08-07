const validateUserAuth=(req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data:{},
            message:"Something wrong with request",
            success:true,
            err:'Email or Password missing'
        });
    }
    next();
}

module.exports={
    validateUserAuth
}