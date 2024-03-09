
const jwt = require('jsonwebtoken')


module.exports = (req,res,next) => 
{
    const token = req.header('Authorization')
    if(!token)
    {
        return res.json('Founded Token')
    }
    try 
    {
        const de = jwt.verify(token,process.env.JWT_SECTET)
        req.user = de.user
        next()
    }catch(err)
    {
        return res.json('problem Token')
    }
}