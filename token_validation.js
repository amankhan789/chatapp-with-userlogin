
const{varify}=require("jsonwebtoken");

module.exports={
    checkToken:(req,res, next)=>{
        let token= req.get("authorization");
    if(token){
        token=token.slice(7);
        varify(token,"qwe1234",(err, decoded)=>{
            if(err){
                res.json({
                    success:0,
                    message:"invalid token"
                })
            }else{
                next();
            }
        })
   
    }else{
        res.json({
            success:0,
            message:"access denied ! unauthorized user"
        });
    }
    }
};
 

