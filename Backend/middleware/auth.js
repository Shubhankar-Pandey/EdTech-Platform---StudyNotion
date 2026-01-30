const jwt = require("jsonwebtoken");


// *************** auth ***************

exports.auth = async(req, res, next) => {
    try{
        // fetch token from req
        const token = req.cookies.token;
                            // req.body.token || 
                        // req.header("Authorization").replace("Bearer ", "");

        // if token missing
        if(!token){
            return res.status(401).json({
                success : false,
                message : "Token in missing",
            })
        }

        // verify the token 
        try{
            const payload = jwt.verify(token, process.env.JWTSECRET);
            req.user = payload;
        }
        catch(error){
            return res.status(401).json({
                success : false,
                message : "Token is invalid",
            })
        }
        // if all things are valid then move to the next middleware
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong, while validating the token",
        });
    }
}


// *************** isStudent ***************

exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for student only",
            });
        }
        // if all things are valid then move to the next middleware
        next();
    }   
    catch(error){
        console.log(error);
        return res.status(401).json({
            success : false,
            message : "Something went wrong, while validating the Student",
        });
    }
}



// *************** isInstructor ***************

exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for instructor only",
            });
        }
        // if all things are valid then move to the next middleware
        next();
    }   
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong, while validating the Instructor",
        });
    }
}



// *************** isAdmin ***************

exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for admin only",
            });
        }
        // if all things are valid then move to the next middleware
        next();
    }   
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong, while validating the Admin",
        });
    }
}