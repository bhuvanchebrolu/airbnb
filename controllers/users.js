const User=require("../models/user");
module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp=async(req,res)=>{
    try{
            let {username,email,password}=req.body;
            const newUser=new User({email,username});
            const registeredUser=await User.register(newUser,password);
            console.log(registeredUser);
            req.login(registeredUser,(err)=>{
                if(err){return next(err);}
                
                req.flash("success","Welcome to wanderlust!");
                res.redirect("/listings");
            })

    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

}
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to wanderlust !!, You are logged in");
    if(res.locals.redirectUrl){
        return res.redirect(res.locals.redirectUrl);//use return in conditional blocks that send a response
    }
    res.redirect("/listings");
}
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("error","You are logged out!!");
        res.redirect("/listings");
    })
}