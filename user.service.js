const pool=require("../../config/database");
const { getUsersByUserId } = require("./user.controller");


module.exports={
    create:(data,callBack)=>{
        pool.query(`insert into user (name,email,password)
          value(?,?,?)`,
          [
              data.name,
              data.email,
              data.password,
             
          ],
          (error,result, field)=>{
            if(error){
                 return callBack(error);

            }
              return callBack(null,result);
          }

          );
    },
    getUsers: callBack =>{
  pool.query(
    `select id , name,email,password from user`,
    [],
    (error,result,fields)=>{
      if(error){
         return callBack(error);
      }
      return callBack(null,results)
    }
  );
    },
    getUsersBYUserId: (id, callBack) =>{
      pool.query(
        `select id , name,email,password from user where id=?`,
        [id],
        (error,result,fields)=>{
          if(error){
             return callBack(error);
          }
          return callBack(null,result[0]);
        }
      );
        },
        updateUser:(data,callBack)=>{
          pool.query(
    `update user set name=?,email=?,password=?, where id =?`),    
            [
                data.name,
                data.email,
                data.id
            ],
            (error,result, field)=>{
              if(error){
                   return callBack(error);
 
              }
                return callBack(null,results);
            }
 
                  },
       
          deleteUser:(data, callBack)=>{
            pool.query(
              `delete from user where id = ?`,
              [data.id],
              (error, result,fields)=>{
               if(error){
                  return callBack(error);
               }
               return callBack(null, results[0]);
              }
            );

           
          },
          getUsersByUserEmail:(email,callBack)=>{
            pool.query(
              `select * from user where email =?`,
              [email],
              (error,result,fields)=>{
                if (error){
                  callBack(error);
                }
                return callBack(null, result[0]);
              }
            );
          }
        };
 


        /*var name= req.body.name;
        console.log(name);
        var email=req.body.email;
        console.log(email);
        var password=req.body.password;
        if (name=="" || email=="" || password=="") {
          res.render('process', {flag: false, condition: false,fail:false});     
        }*/           