const express = require("express");
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// setting up images and css files
app.use(express.static(__dirname + "/public"));

// index page
app.get("/", function (req, res) {
  var tagline = "Learning EJS";

  res.render("pages/index", { tagline });
});

// about page
app.get("/about", function (req, res) {
  var mascots = [
    { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
    { name: "Tux", organization: "Linux", birth_year: 1996 },
    { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
  ];
  res.render("pages/about", { mascots });
});

// login page
app.get("/login", function (req, res) {
  res.render("pages/login");
});

// signin page
app.get("/sign-in", function (req, res) {
  res.render("pages/signin");
});

// setup the server port
const port = process.env.PORT || 3000;

// listening port 3000
app.listen(port, () => {
  console.log(`Listening port ${port}...`);
});
