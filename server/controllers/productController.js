import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import categoryModel from "../models/categoryModel.js";
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;
    //Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ error: "Image is Required and should be less than 1mb" });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Product",
      error,
    });
  }
};
export const getAllProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "AllProduct",
      totalCount: product.length,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Retrieving Product",
      error,
    });
  }
};
//get single product
export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel
      .findOne({ slug })
      .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Product is Retrieved",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Retrieving Product",
      error,
    });
  }
};
//get image

export const getImageController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await productModel.findById(id).select("image");
    if (product.image.data) {
      res.set("Content-type", product.image.contentType);
      return res.status(200).send(product.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Retrieving Product Image",
      error,
    });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-image");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Product",
      error,
    });
  }
};
//update product Controller
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;
    //Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ error: "Image is Required and should be less than 1mb" });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Product",
      error,
    });
  }
};
//filters
export const productFilterController = async (req, res) => {
  try {
    const { checked, price } = req.body;
    let arg = {};
    if (checked.length > 0) {
      arg.category = checked;
    }
    if (price.length) {
      arg.price = { $gte: price[0], $lte: price[1] };
    }
    const product = await productModel.find(arg);
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While filtering Product",
      error,
    });
  }
};
//product-count Controller
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Product Count",
      error,
    });
  }
};
export const productListController = async (req, res) => {
  try {
    const perpage = 6;
    const page = req.params.page ? req.params.page : 1;
    const product = await productModel
      .find({})
      .select("-image")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });
      res.status(200).send({
        success:true,
        product
      })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in Retrieving Product",
      error,
    });
  }
};
export const searchProductController=async (req,res)=>{
  try {
    const {keyword}=req.params;
    const result=await productModel.find({
      $or:[
        {name:{$regex : keyword,$options:"i"}},
        {description:{$regex : keyword,$options:"i"}}
      ]
    }).select("-image")
    res.json(result);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in Searching Product",
      error,
    });
  }
}
//relatedProductController
export const relatedProductController =async (req,res)=>{
  try {
    const{id,cid}=req.params;
    const product =await productModel.find({
      category:cid,
      _id:{$ne:id}
    }).select("-photo").limit(3).populate("category")
    res.status(200).send({
      success:true,
      product
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Searching Similar Product",
      error
    });
  }
}
//product category controller
export const productCategoryController =async(req,res)=>{
  try {
    const{slug}=req.params;
    const category=await categoryModel.findOne({slug});
    const product=await productModel.find({category}).populate("category");
    res.status(200).send({
      success:true,
      product,
      category
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Retrieving Category Wise Product",
      error
    });
  }
}