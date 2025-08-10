import jwt from 'jsonwebtoken'

 const requireAuth = async (req, res, next)=>{
//* is user logged in or not
    const token = req.cookies.token;
//  console.log(token ,"token is expired")
    if(!token){
        return res.status(401).json({message : "Unauthorized"})
    }
   
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        
        next()
    } catch (error) {
        res.status(401).json({message : "Invalid Token"})
    }
}

export {requireAuth}