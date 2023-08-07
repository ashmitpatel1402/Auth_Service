const UserRepository=require('../repository/user-repository');

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
}

module.exports=UserService;