const db = require('../util/db-connection');
const Products = require('../models/product');
const path = require('path');

const getAddProductPage = (req,res) => {

    res.sendFile(path.join(__dirname,'../','views','index.html'));
}

const getProducts = async (req,res) => {

    try{
        const products = await Products.findAll();
        res.status(200).json(products);
    } catch(error){
        console.log(error);
    }
}

const addProduct = async (req,res) => {

    try{
        const {name,description,price,quantity} = req.body;
        const product = await Products.create({

            name : name,
            description : description,
            price : price,
            quantity : quantity
        });
        res.status(200).json({ message: 'product added successfully', product });
    } catch(error){
        console.log(error);
        res.status(500).json({message:'unable to add product'});
    }
}

const updateProductData = async (req,res) => {
    
    try{
        const {id} = req.params;
        const {name,description,price,quantity} = req.body;
        const product = await Products.findByPk(id);
        product.name = name;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        await product.save();
        res.status(200).json({message:'product updated'});
    } catch(error){
        console.log(error);
    }
   
}

const deleteProduct = async (req,res) => {

    try{
        const {id} = req.params;
        const product = await Products.destroy({
            where : {id : id}
        })

        res.status(200).json({message:`product with id:${id} is deleted`});
    } catch(error){
        console.log(error);
        res.status(500).json({message:'unable to delete product'});
    }
}

module.exports = {
    getAddProductPage,
    addProduct,
    getProducts,
    updateProductData,
    deleteProduct
}