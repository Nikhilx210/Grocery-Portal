import express from "express"
import {registerController,loginController,testController,forgetPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { isAdmin, requireSignin } from "../middlewares/authMiddlewares.js";
import passport from 'passport'
import JWT from "jsonwebtoken"
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
//orders
router.get('/orders',requireSignin,getOrdersController);
//All orders
router.get('/all-orders',requireSignin,isAdmin,getAllOrdersController);
//order status update
router.put('/order-status/:orderId',requireSignin,isAdmin,orderStatusController)

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});
router.get("/login/success", (req, res) => {
	console.log("hello")
	if (req.user) {
		const token= JWT.sign({_id:req.user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
		const user = req.user;
		res.status(200).send({
            success:true,
            message:"Login Successfully",
            user:{
                name:user.name,
                email:user.email,
                role:user.role
            },
            token
        });
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});
router.get("/logout", (req, res) => {
	req.logout(req.user, err => {
	  if(err) return next(err);
	});
	res.redirect('http://localhost:3000/login')
  });
router.get("/google/callback",passport.authenticate("google", {
		successRedirect: "http://localhost:3000",
		failureRedirect: "/login/failed",
	})
);
export default router;