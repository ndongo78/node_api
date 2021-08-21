const express =require('express');
const {Category} =require('../models')

const categorieRouter=express.Router()

//get all category
categorieRouter.get('/',async(req,res)=>{
    try {
        const categories= await Category.findAll()
        return res.json(categories)
    } catch (error) {
        return res.json(error)
    }
})
//create category
categorieRouter.post('/create',async(req,res)=>{
        const {name}=req.body;
        try {
            const categorie= await Category.create({name})
            return res.json({message:"Categorie creer avec success"})
        } catch (error) {
            return res.json(error)
        }
})


module.exports=categorieRouter;