const dotenv=require('dotenv');

dotenv.config();//call our .env file

module.exports={
    PORT:process.env.PORT
}
