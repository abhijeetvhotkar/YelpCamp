var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema setup

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var  Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
//     description:"This is a huge Granite hill, no bathroom, no water. Beautiful Granite"
//   }, function(err, campground){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log("Newly created campground");
//       console.log(campground);
//     }
//   });


//INDEX -  
app.get("/", function(req, res){
  res.render("landing");
});

//NEW - Display form to make a new dog
app.get("/campgrounds", function(req, res){
  // Get all campgrounds from db and render here
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }
    else {
      res.render("index",{campgrounds: allCampgrounds});
    }
  });
  // res.render("campgrounds",{campgrounds: campgrounds});
});

//CREATE - route to add a new dog
app.post("/campgrounds", function(req, res){
  //get data from form add to array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      //redirect from the campgrounds page
      res.redirect("/campgrounds");
    }
  });
});


app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

// Shows more info
app.get("/campgrounds/:id", function(req, res) {
  //find that campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      //render show template with that campground
      res.render("shows", {campground: foundCampground});
    }
  });
  req.params.id
});


app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server has started");
});

// app.listen(3000, function(){
//   console.log("Yelcamp server has started");
// });