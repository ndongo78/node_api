const express =require('express');
const multer = require('../midlware/multer');
const {Commande} =require('../models')
const {Op}=require('sequelize')
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);


const commandeRouter=express.Router()

commandeRouter.get('/',async(req,res)=>{
  try {
      const commandes=await Commande.findAll({include:'articles'})
      return res.json(commandes)
  } catch (error) {
     return res.json(error)
  }
})

commandeRouter.post("/payement", async (req, res) => {
    let { amount, id,cart,userid } = req.body;
    //console.log("commande", amount, id,cart);
    const ids=cart.map(item=>item.id)
    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "Ndongo shop ",
        payment_method: id,
        confirm: true,
      });
      console.log(payment)
      if(payment.id){
        cart.map(item=>(
          Commande.create({
            userId:userid,
            articleId: item
          })
        ))
        }
      // console.log("stripe-routes.js 19 | payment", payment);
      res.json({
        message: "Payment Successful",
        success: true,
      });
    } catch (error) {
      console.log("error", error);
      res.json({
        message: error,
        success: false,
      });
    }
  });

  commandeRouter.get('/last/:id',async(req,res)=>{
     const {id}=req.params;
     console.log(id)
    const commande=await Commande.findAll({where:{userId:id}, order: [ [ 'createdAt', 'DESC' ]],include:'articles',limit:1})

    res.json(commande)
  })

module.exports=commandeRouter
