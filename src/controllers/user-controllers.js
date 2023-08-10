const UserService=require('../services/user-service');
const userService=new UserService();
const create=async(req,res)=>{
    try{
         const response=await userService.create({
           email:req.body.email,
            password:req.body.password
        });
         return res.status(201).json({
            data:response,
            success:true,
            message:"Successfully created user",
            err:{}
         })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Something went wrong",
            err:error
        });
    }
}

const signIn=async(req,res)=>{
    try{
        const response=await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            data:response,
            message:"Signin successfull",
            error:{},
            success:true
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Something went wrong during signIn process",
            err:error
        });
    }
}

const isAuthenticated=async(req,res)=>{
    try{
         const token=req.headers['x-acess-token'];
         const response=await userService.isAuthenticated(token);
         /*WE should not write it here because it is possible the user might no longer exist in our databse
         ie he deleted and we will still be authenticating him*/
         return res.status(200).json({
            data:response,
            message:"Authentication successfull",
            error:{},
            success:true
         })
    }catch(error){
        return res.status(500).json({
            data:{},
            success:false,
            message:"Something wrong during Authentication",
            err:error
        })
    }
}
const isAdmin=async(req,res)=>{
    try{
        const response=await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data:response,
            success:true,
            err:{},
            message:"Successfully fetched whether user is admin or not"
        })
    }catch(error){
        return res.status(500).json({
            data:{},
            success:false,
            message:"Something went wrong",
            err:error
        })
    }
}

const isBusiness_Role=async(req,res)=>{
    try{
        const response=await this.userService.isBusiness_Role(req.body.id);
        return res.status(200).json({
            data:response,
            success:true,
            err:{},
            message:"Successfully fetched whether user has Business_Role or not"
        });
    }catch(error){
        return res.status(500).json({
            data:{},
            success:false,
            message:"Something went wrong",
            err:error
        })
    }
}

module.exports={
    create,
    signIn,
    isAuthenticated,
    isAdmin,
    isBusiness_Role
}