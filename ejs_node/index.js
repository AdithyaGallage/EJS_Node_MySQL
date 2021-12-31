const express = require("express");
const config = require("./config/databaseConfig");

const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// setting up images and css files
app.use(express.static(__dirname + "/public"));

// parse application/json, basically parse incoming Request Object as a JSON Object
//app.use(express.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.urlencoded({ extended: false }));

/*
 body-parser (it is an NPM package) to do the same thing. 
 It is developed by the same peeps who built express and is designed to work with express. 
 body-parser used to be part of express. 
 Think of body-parser specifically for POST Requests (i.e. the .post request object) and/or PUT Requests (i.e. the .put request object).

// calling body-parser to handle the Request Object from POST requests
  var bodyParser = require('body-parser');

// parse application/json, basically parse incoming Request Object as a JSON Object 
  app.use(bodyParser.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
  app.use(bodyParser.urlencoded({ extended: false }));
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
  app.use(bodyParser.urlencoded({ extended: true }));

*/
const connection = config.connection;
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
  res.render("pages/login", {email: "", password: ""});
});

// signin page
app.get("/sign-in", function (req, res) {
  res.render("pages/signin", {name: "", email: "", password: ""});
});

// registering a user
app.post("/sign-in", async function (req, res) {
  console.log(
    `userName : ${req.body.userName}\nuserEmail : ${req.body.userEmail}\nuserPassword : ${req.body.userPassword}`
  );
  const selectUsers = "SELECT * FROM `users`";
  try {
    const [users] = await connection.promise().execute(selectUsers);
    console.log(users);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// setup the server port
const port = process.env.PORT || 3000;

// listening port 3000
app.listen(port, () => {
  console.log(`Listening port ${port}...`);
});
