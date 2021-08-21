const express =require('express');
const multer = require('../midlware/multer');
const {Article} =require('../models')
const {Op}=require('sequelize')

const articleRouter=express.Router()


//get all articles
articleRouter.get('/',async(req,res)=>{
    try {
        const articles= await Article.findAll({include:'category'});
        return res.json(articles)
    } catch (error) {
        return res.json(error)
    }
})
//get new add
articleRouter.get('/nouveau',async(req,res)=>{
    try {
        const articles= await Article.findAll({ limit: 10 });
        return res.json(articles)
    } catch (error) {
        return res.json(error)
    }
})
//get popular item
articleRouter.get('/popular',async(req,res)=>{
    try {
        const articles= await Article.findAll({ order: [ [ 'createdAt', 'DESC' ]],limit:10 });
        return res.json(articles)
    } catch (error) {
        return res.json(error)
    }
})

//best noted 
articleRouter.get('/noted',async(req,res)=>{
    try {
        const articles= await Article.findAll({ where:{avis:{[Op.gt]:4}} });
        return res.json(articles)
    } catch (error) {
        return res.json(error)
    }
})

articleRouter.get('/carousel',async(req,res)=>{
    try {
        const articles= await Article.findAll({ order: [ [ 'createdAt', 'DESC' ]],limit:5 });
        return res.json(articles)
    } catch (error) {
        return res.json(error)
    }
})



//post new article
articleRouter.post('/create',multer,async(req,res)=>{
    const {title,description,price,image,categoryId,avis}=req.body;
    
     try {
         const article=await Article.create({
             categoryId,
             title,
             description,
             price,
             avis,
             image:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
         })
         return res.json({message:'Article sauvegarder avec success'})
     } catch (error) {
         return res.json(error)
     }
})
//delete
articleRouter.delete('/delete/:id',async(req,res)=>{
    const id= req.params;
    try {
        await Article.destroy({where: id})
        return res.json({message:'Article sumprimé avec success'})
    } catch (error) {
        return res.json(error)
    }
    
})
//delete
articleRouter.put('/update/:id',async(req,res)=>{
    const id= req.params;
    const {title,description,price,image,categoryId,avis}=req.body;
    
    try {
         const article=await Article.findOne({where: id})
         //article.body=body
         //await article.save()
        article.categoryId=categoryId
        article.title=title
        article.description=description;
        article.price=price;
        article.image=image;
        article.avis=avis;
       await article.save();
        return res.json(article)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
    
})

articleRouter.post('/payement',async(req,res)=>{
    console.log(req.body)
})
module.exports=articleRouter;