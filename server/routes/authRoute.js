import express from "express"
import {registerController,loginController,testController} from '../controllers/authController.js'
import { isAdmin, requireSignin } from "../middlewares/authMiddlewares.js";

//Router Object
const router=express.Router();

//Register
router.post('/register',registerController);

//Login
router.post('/login',loginController)

//test
router.get('/test',requireSignin,isAdmin,testController)
export default router;