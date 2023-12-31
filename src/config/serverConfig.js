const dotenv=require('dotenv');
const bcrypt=require('bcrypt');

dotenv.config();//call our .env file

module.exports={
    PORT:process.env.PORT,
    SALT:bcrypt.genSaltSync(10),
    jwtKey:process.env.jwtKey
}
