const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User{

    async findAll(){
        try{
            const result = await knex.select(["id","email","name"]).table("users");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findByEmail(email){
        try{
            const result = await knex.select(["id","email","password","name"]).where({email:email}).table("users");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async new(email,password,name){
        try{
            const hash = await bcrypt.hash(password, 10);
            await knex.insert({email,password: hash,name}).table("users");
        }catch(err){
            console.log(err);
        }
    }   

    async findEmail(email){
        try{
            const result = await knex.select("*").from("users").where({email: email});
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err);
            return false;
        }
    }
}

module.exports = new User();