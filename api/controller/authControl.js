const config = require("config");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Users = require('../../models/Users');


//CHECK FOR THE USER

exports.authenticateUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        //REMOVE LATER OR NOT 
        if( !email || !password )
            return res.status(400).json({
                success: false,
                msg: "ENTER ALL FIELDS"
            })
        
        const checkForUser = await Users.findOne({ email });
        if(!checkForUser)
        {
            return res.status(400).json({
                success: false,
                msg: "EMAIL DOSE NOT EXIST"
            })
        }
        else{
            const match = await bcrypt.compare(password, checkForUser.password); 
            
            if(!match){
              return res.status(400).json({
                success: false,
                msg: "INVALID PASSWORD"
                })  
            }
            else{
               //ASSIGN TOKEN 
                    jwt.sign(
                        {id: checkForUser.id},
                        config.get('jwtSecret'),
                        { expiresIn: 4000 },
                        (err, token) => {
                            if(err)
                                throw err;
                            return res.status(200).json({
                                token,
                                success: true,
                                id: checkForUser.id,
                                name: checkForUser.name,
                                email: checkForUser.email
                            })   
                        }
                        )
            }
        }
    
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "SERVER ERROR"
        })
    }
}



//AUTHENTICATE A USER VIA HIS TOKEN 

exports.getUser = async (req, res, next) =>{

    //AUTHENTICATION MIDDLE WARE CODE SO IT CAN GET PRIVATE ROUTES
    const token = req.header('x-auth-token');
    
    //IF NO TOKEN RECEVIED
    if(!token)
    {
        return res.status(401).json({
            msg:'UNAUTHORIZED'
        });
    }
    try {
        const tokenId = jwt.verify(token, config.get('jwtSecret'));
        const user = await Users.findById(tokenId.id).select('-password');
        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(400).json({
            msg:'INVALID TOKEN'
        });
    }

}