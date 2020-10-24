const config = require("config");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Users = require('../../models/Users');


//GET ALL USERS
exports.getUsers = async (req, res, next) => {
    try {
        const recivedUsers = await Users.find();
        return res.status(200).json({
            success: true,
            count: recivedUsers.length,
            data: recivedUsers
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "SERVER ERROR"
        })
    }
}


//ADD A USER
exports.addUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        //REMOVE LATER OR NOT 
        if( !name || !email || !password )
            return res.status(400).json({
                success: false,
                msg: "ENTER ALL FIELDS"
            })
        
        const checkForUser = await Users.findOne({ email });
        if(checkForUser)
        {
            return res.status(400).json({
                success: false,
                msg: "EMAIL ALREADY EXIST"
            })
        }
        else{
          
          
            const newUser = new Users({
                name,
                email,
                password
            });
          
            //CREATE A ENCRYPTED PASSWORD

            bcrypt.genSalt(10, (err, salt) => {
                if(err)
                    throw err;
                bcrypt.hash(newUser.password, salt, async (err, hash)=>{
                    if(err)
                        throw err;
                    newUser.password = hash;
                    
                    //ADD THE NEW USER
                    const user = await newUser.save();
                    
                    //ASSIGN TOKEN 
                    
                    jwt.sign(
                        {id: user.id},
                        config.get('jwtSecret'),
                        { expiresIn: 4000 },
                        (err, token) => {
                            if(err)
                                throw err;
                            return res.status(200).json({
                                token,
                                success: true,
                                id: user.id,
                                name: user.name,
                                email: user.email
                            })   
                        }
                        )
                })
            })
        }
    
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "SERVER ERROR"
        })
    }
}