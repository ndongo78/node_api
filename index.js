const express=require('express');
const cors=require('cors');
const PORT=3001;
const {sequelize}=require("./models");
const db=require('./models');
const path=require('path')
const userRouter = require('./route/UserRouter');
const categorieRouter = require('./route/CategorieRouter');
const articleRouter = require('./route/ArticleRouter');
const commandeRouter = require('./route/CommandeRouter');
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const app=express()
app.use(cors())
app.use(express.json())

app.use('/users',userRouter);
app.use('/category',categorieRouter)
app.use('/article',articleRouter)
app.use('/commande',commandeRouter)
app.use("/images",express.static(path.join(__dirname,"images")))

// db.sequelize.sync()
// .then(()=>{
//     app.listen(process.env.PORT || PORT,(req,res)=>{
//     console.log(`Le serve tourne sur le port ${PORT}`)
// })
// })
// .catch(err=>console.log(err))


  app.post('/payements',async(req,res)=>{
    console.log(req.body)
  })

app.listen(PORT,async()=>{
    console.log("Server is running on port 3001")
    await sequelize.authenticate()
    console.log("Database is connected")
})

