const express=require('express')
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')
const {User}=require('../models')

const userRouter=express.Router()

userRouter.post('/register',async(req,res)=>{
    const {
        nom,
        prenom,
        naissance,
        email,
        password,
        telephone,
        addresse,
        pays
     }=req.body;
   try {
    try {
        const user= await User.findOne({where:{email}})
         if(user){
        return res.json({error:"Desoler cet address mail est deja associer a un compte"})
        }else{
            //const hash= bcrypt.hash(password,10)
            const hash=bcrypt.hashSync(password,10)
             const userR=await User.create({
                             nom,
                           prenom,
                           naissance,
                           email,
                           password:hash,
                           telephone,
                           addresse,
                           pays
             })
             return res.json({success: "Veillez utilisé votre email et mot de pas pour se connecter"})
        }

    } catch (error) {
        
        return res.status(500).json(error)
    }

   } catch (error) {
       
   }
})
//user login 
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({where:{email},include:'commande'})
        if(!user){
            res.json({error:"Pas de compte associé cet email"})
        }
         const pass= bcrypt.compareSync(password,user.password)
            if(!pass){
                console.log('ok')
                res.json({error:"Mot de pass incorrect"})
            }else{
                res.json({
                    user,
                    token: jwt.sign({ uuid: user.uuid}, "RANDOM_TOKEN_SECRET",
                    { expiresIn: '24h' }
                    )
                })
                // const accessToken=jwt.sign({
                //     user:usera
                // },"RANDOM_TOKEN_SECRET",
                // {expiresIn: "24h"}
                // )
                // res.json(accessToken)
            }
       
    } catch (err) {
        return err
    }
})
//update user

userRouter.put("/:id",async(req,res)=>{
    const id=req.params
    const {
        nom,
        prenom,
        email,
        password,
        telephone,
        addresse,
        pays
     }=req.body;
    try {
        const user= await User.findOne({where: id})
            const hash=bcrypt.hashSync(password,10)
            user.nom=nom,
            user.prenom=prenom,
            user.email=email,
            user.password=hash,
            user.telephone=telephone,
            user.addresse=addresse,
            user.pays=pays

           await user.save(); 
           res.json(user)
    } catch (error) {
        return res.json(error)
    }
})


module.exports=userRouter;