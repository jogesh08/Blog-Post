var express     =require("express"),
methodOverride  =require("method-override"),
bodyParser      =require("body-parser"),
mongoose        =require("mongoose"),
app             =express();

mongoose.connect("mongodb://localhost/restful_app");
app.set("view engine","ejs");
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var BlogSchema=new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:String,default:Date.now}
});

var Blog=mongoose.model("Blog",BlogSchema);

//INDEX ROUTE
app.get("/",function(req,res){
	res.redirect("/blogs");
})

//DISPLAY ROUTE
app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log("ERROR!!");
		}
		else
		{
            res.render("index",{blogs:blogs});
		}
	});
    
});

//NEW ROUTE
app.get("/blogs/new",function(req,res){
	res.render("new");

});

//CREATE ROUTE
app.post("/blogs",function(req,res){
  Blog.create(req.body.blog,function(err,newblog){
    if(err){
    	res.render("new");
    }
    else
    {
    	res.redirect("/blogs");
    }
  });
});

//SHOW ROUTE
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
        	res.redirect("/blogs");
        }
        else
        {
        	res.render("show",{blog:foundBlog});
        }
	});
});

//EDIT ROUTE
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
          if(err){
          	res.send("404 ERROR");
          }
          else
          {
          	 res.render("edit.ejs",{blog:foundBlog});
          }
	});
   
});

//UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,foundBlog0){
         if(err){
         	res.redirect("/blogs");
         }
         else
         {
         	res.redirect("/blogs/" +req.params.id);
         }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id/delete",function(req,res){
     Blog.findByIdAndRemove(req.params.id,function(err,DeleteBlog){
     	if(err){
     		res.redirect("/blogs");
     	}
     	else
     		res.redirect("/blogs");
     });
});






app.listen(3000,function(){
    console.log("SERVER STARTED RUNNING");
});
