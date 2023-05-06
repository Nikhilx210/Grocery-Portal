import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authMiddlewares.js';
import { createProductController,deleteProductController,getAllProductController, getImageController,  getSingleProductController, productCountController, productFilterController, productListController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
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
//filter product
router.post('/product-filter',productFilterController);
//product count
router.get('/product-count',productCountController);
//product per page
router.get('/product-list/:page',productListController);
//Search product
router.get('/search/:keyword',searchProductController);
//Similar product
router.get('/related-product/:id/:cid',relatedProductController);
export default router;