const express=require('express');
const userController=require('../../controllers/user-controllers');
const {AuthRequestValidators}=require('../../middlewares/index');
const router=express.Router();

router.post('/signup',
            AuthRequestValidators.validateUserAuth,
            userController.create);
router.post('/signin',
            AuthRequestValidators.validateUserAuth,
            userController.signIn);

            router.get('/isAuthenticated',
                             userController.isAuthenticated);


router.get('/isAdmin',AuthRequestValidators.validateAdmin,userController.isAdmin);

router.get('/isBusiness_Role',AuthRequestValidators.validateAdmin,userController.isBusiness_Role);


module.exports=router;