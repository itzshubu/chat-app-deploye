import JWT from "jsonwebtoken"
const createTokenAndSaveCookies = (userId , res)=>{
   const token = JWT.sign({userId},process.env.JWT_TOKEN,{
    expiresIn:"10d"
   });
   res.cookie("jwt",token,{
      httpOnly: true, // Mitigates XSS attacks
    secure: true, // Cookie sent over HTTPS only
    sameSite: "strict", // Mitigates CSRF attacks
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
   });
}
export default createTokenAndSaveCookies