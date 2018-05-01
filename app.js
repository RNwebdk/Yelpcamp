let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//all view files is ejs
app.set("view engine", "ejs");

//data from the database (later)
let data = [
	{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
	{name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
	{name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
];

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: data});
});

app.post("/campgrounds", function(req, res){
	//test the route
	// res.send("You posted something on the campgrounds route!");

	//get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = {name: name, image: image}
	data.push(newCampground);
	
	//redirect back to campgrounds
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
})

app.get("*", function(req, res){
	res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(3000, () => console.log("Application listening on port 3000!"));