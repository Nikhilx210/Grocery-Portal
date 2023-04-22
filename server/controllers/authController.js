import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"
const registerController=async(req,res)=>{
    try {
        const {name,email,password,phone,address}=req.body;
        //validation
        if(!name){
            return res.send({error:'Name is Required'})
        }
        if(!email){
            return res.send({error:'Email is Required'})
        }
        if(!password){
            return res.send({error:'Password is Required'})
        }
        if(!phone){
            return res.send({error:'Phone No is Required'})
        }
        if(!address){
            return res.send({error:'Address is Required'})
        }
        //existing user
        const existinguser=await userModel.findOne({email})
        if(existinguser){
            return res.status(200).send({
                success:true,
                message:"Already Register Please Login",
            })
        }
        //register user
        const hp=await hashPassword(password);
        console.log(hashPassword);
        // save
        const user=await new userModel({name,email,phone,address,password:hp}).save();
        res.status(201).send({
            success:true,
            message:"User Register Successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
    }
};
const loginController=async (req,res)=>{
    try {
        const {email,password}=req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password",
            })
        }
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not Registered",
            })
        }
        const match=await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password",
            })
        }
        //Token
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"15m"});
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}
//test Controller
const testController=(req,res)=>{
    res.send("Hello There")
}
export {registerController,loginController,testController};