var express =require("express");
// var path = require('path');
var mongoose  = require("mongoose");
var bodyparser = require("body-parser");
var app = express();

mongoose.connect("mongodb://localhost/restful_blog_app",{useMongoClient: true});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname, 'public')));

//mongoose model config
var blogSchema = new mongoose.Schema({

    title:String,
    image:String,
    body:String,
    created: {type:Date ,default: Date.now}
});
var Blog = mongoose.model("Blog" , blogSchema);

//RESTful Routes
app.get("/", function(req, res){
    res.redirect("/blogs");


});
//INDEX route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err,blogs){
        if(err){
            console.log(err);
        }else{
                 res.render("index.ejs", {blogs :blogs});
        }
    });
   
});

 //NEW route
    app.get("/blogs/new", function(req,res){
        res.render("new");
    });

//create route
app.post("/blogs", function(req,res){
    //create blog
   
    var title= req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var newBlog = {title:title, image:image, body:body};
    Blog.create (newBlog, function(err, newlyCreatedBlog){
        if(err){
            res.render("new");
        }else{
            //then redirect to the index
            res.redirect("/blogs");
        }
    });

} );


    //server started
app.listen(3002, function(){
    console.log("RESTful app is serving at PORT 3002");

});