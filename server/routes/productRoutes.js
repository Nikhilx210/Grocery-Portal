import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authMiddlewares.js';
import { createProductController,deleteProductController,getAllProductController, getImageController,  getSingleProductController, updateProductController } from '../controllers/productController.js';
import formiadable from 'express-formidable'
const router=express.Router();

//routes
router.post('/create-product',requireSignin,isAdmin,formiadable(),createProductController)
//get product
router.get('/get-product',getAllProductController)
//Single Product
router.get('/get-product/:slug',getSingleProductController)
//get Images
router.get('/product-image/:id',getImageController);
//delete product
router.delete('/delete-product/:id',requireSignin,isAdmin,deleteProductController);
//update product
router.post('/update-product/:id',requireSignin,isAdmin,formiadable(),updateProductController);
export default router;