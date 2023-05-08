import express from "express"
import {registerController,loginController,testController,forgetPasswordController, updateProfileController} from '../controllers/authController.js'
import { isAdmin, requireSignin } from "../middlewares/authMiddlewares.js";

//Router Object
const router=express.Router();

//Register
router.post('/register',registerController);

//Login
router.post('/login',loginController)

//test
router.get('/test',requireSignin,isAdmin,testController)

//protected route user
router.get('/user-auth',requireSignin,(req,res)=>{
    res.status(200).send({ok:true});
})
//protected route admin
router.get('/admin-auth',requireSignin,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})
//forget Password
router.post('/forget-password',forgetPasswordController);
//update profile
router.put('/update-profile',requireSignin,updateProfileController);
export default router;