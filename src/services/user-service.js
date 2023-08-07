const UserRepository=require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const {jwtKey}=require('../config/serverConfig');
const bcrypt=require('bcrypt');


class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async create(data){
        try{
            const user=await userRepository.create(data);
            return user;
        }catch(error){
            console.log("Something wrong in service layer");
            throw{error};
        }
    }

    async signIn(email,plainPassword){
        try{
            //fetch user using email
            const user=await this.userRepository.getByEmail(email);
            //check password
            const passwordMatch=this.checkPassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("Password does not match");
                throw{error:"Incorrect password"};
            }
            //if correct password create token
            const newJWT=this.createToken({email:user.email,id:user.id});
            return newJWT;

        }catch(error){
            console.log("Something wrong in sign in process");
            throw{error};
        }
    }

    createToken(userObject){//object->email , id
        try{
            const result=jwt.sign(userObject,jwtKey,{expiresIn:'1h'});
            return result;
        }catch(error){
            console.log("Something wrong in token creation");
            throw{error};
        }
    }

    verifyToken(token){
        try{
            const response=jwt.verify(token,jwtKey);//in case the token is not verified jwt itself throws the error
            return response;//if verified we get the same object with which we created the token with iat and exp properties
        }catch(error){
            console.log("Something went wrong while verifying the token",error);
            throw{error};
        }
    }

    checkPassword(userInputPassword,encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPassword,encryptedPassword);
        }catch(error){
            console.log("Something wrong while checking password");
            throw{error};
        }
    }

    async isAuthenticated(token){
        try{
            const response=this.verifyToken(token);
            if(!response){
                throw{error:'Invalid Token'};
            }
            const user=this.UserRepository.getById(response.id);
            if(!user){
                throw{error:'No user with corrosponding token'}
            }
            return user.id;
        }catch(error){
            console.log("Something went wrong");
            throw{error};
        }
    }
}

module.exports=UserService;