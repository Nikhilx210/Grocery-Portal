import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authMiddlewares.js';
import { catcontroller, createCategoryController ,deleteCategoryController,singleCategoryController,UpdateCategoryController} from '../controllers/categoryController.js';

const router=express.Router()
//routes
//create Category
router.post('/create-category',requireSignin,isAdmin,createCategoryController);
//update Category
router.put('/update-category/:id',requireSignin,isAdmin,UpdateCategoryController);
//getAll
router.get('/get-category',catcontroller)

//single category
router.get('/single-category/:slug',singleCategoryController)

//delete category

router.delete('/delete-category/:id',requireSignin,isAdmin,deleteCategoryController)
export default router;