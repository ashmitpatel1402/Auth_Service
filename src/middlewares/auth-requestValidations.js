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

const validateAdmin=(req,res,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            data:{},
            message:"Something wrong with the request",
            success:true,
            err:'Id is missing'
        });
    }
    next();
}

module.exports={
    validateUserAuth,
    validateAdmin
}