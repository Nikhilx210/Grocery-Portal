import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController=async (req,res)=>{
    try {
        const{name}=req.body;
        if(!name){
            return res.status(401).send({
                message:'Name is Required'
            })
        }
        const existingCategory= await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'Category Already Exist'
            })
        }
        const category=await new categoryModel({name,slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:'Category Created Successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error In Category'
        })
    }
}

//UpdateCategoryController
export const UpdateCategoryController=async (req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        console.log(id)
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while updating Category",
            error
        })
    }
}

//get all Category
export const catcontroller = async(req,res)=>{
    try {
        const category=await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"All Category List",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while while getting all Category",
            error
        })
    }
}

//single category Controller
export const singleCategoryController=async (req,res)=>{
    try {
        const {slug}=req.params;
        const category=await categoryModel.findOne({slug});
        res.status(200).send({
            success:true,
            message:"Category Search Successfull",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while while getting Category",
            error
        })
    }
    
}
//delete Category
export const deleteCategoryController =async (req,res)=>{
    try {
        const {id}=req.params;
        const category=await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfull",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while deleting Category",
            error
        })
    }
}