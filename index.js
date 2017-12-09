var express = require("express"),
    app         = express(),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    methodOverride = require("method-override"),
    seedDb = require("./seeds"),
    
    homeRoutes = require("./routes/home"),
    questionRoutes = require("./routes/question"),
    topicRoutes = require("./routes/topic"),
    userRoutes = require("./routes/user"),
    commentRoutes = require("./routes/comments");
    seedDb();
    
    mongoose.connect("mongodb://localhost/quora");
    
    app.set("view engine","ejs");
    app.use(express.static(__dirname+"/public"));
    app.use(methodOverride("_method"));
    
    
    app.use(require("express-session")({
    
    secret:"hello world",
    resave:false,
    saveUninitialized:false
    
}));
    app.use(Passport.initialize());
    app.use(Passport.session());
    

    app.use(bodyparser.urlencoded({extended:true}));
    //Passport.use(new LocalStrategy(User.authenticate()));
    //Passport.serializeUser(User.serializeUser());
    //Passport.deserializeUser(User.deserializeUser());
    
   app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   //res.locals.errorMessage = req.flash("error");
   //res.locals.successMessage=req.flash("success");
   next();
});

    app.use(homeRoutes);
    app.use("/questions",questionRoutes);
    app.use("/topics",topicRoutes);
    app.use("/users",userRoutes);
    app.use("/comments",commentRoutes);
        
    app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server nadustundi"); 
});