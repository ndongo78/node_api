const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  
  const accessToken=req.header("accessToken")

    if(!accessToken) return res.json({error:"pas acces"})
  try {
    //const token = req.headers.authorization.split(' ')[1];
    
    
    const validToken=jwt.verify(accessToken,"RANDOM_TOKEN_SECRET")
        
  if(validToken){
    return next();
  }


    // const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // const userUuid = decodedToken.uuid;
    // if (req.body.userUuid && req.body.userUuid !== userUuid) {
    //   throw 'Invalid user ID';
    // } else {
    //   next();
    // }
  } catch {
    res.status(401).json({
      error: 'Invalid request!'
    });
  }
};

module.exports= auth;