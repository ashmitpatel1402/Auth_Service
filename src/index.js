const express=require('express');
const apiRoutes=require('./routes/index');
const bodyParser=require('body-parser');
const app=express();
const {PORT}=require('./config/serverConfig');

const prepareAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    app.listen(PORT,()=>{
        console.log(`Server started on PORT ${PORT} `);
    });
}

prepareAndStartServer();