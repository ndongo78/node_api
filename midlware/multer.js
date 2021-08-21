const multer=require("multer")

//on declare les xetensions 
const MIME_TYPES={
    "image/jpg":"jpg",
    "image/jpeg":"jpg",
    "image/png":"png"
}

const storage=multer.diskStorage({
    //destination de l'image
    destination:(req,file,callback)=>{
        callback(null,"images")
    },
    //le nom de l'image
    filename:(req,file,callback)=>{
        //nom et on enleve les spaces et remplacer par underscore
        const name=file.originalname.split(' ').join('_');
        //Assigne les extensions 
        const extension=MIME_TYPES[file.mimetype];
        callback(null,name + Date.now() + '.' + extension)
    }
})

module.exports=multer({storage}).single("image");