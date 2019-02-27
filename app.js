//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const request = require('request');
const router = express.Router();
const path = require('path');
const _ = require('lodash');


const homeStartingContent = "Superior moving, packing, and storage systems. Free personalized firm quotes. Our experienced movers are available to move you anywhere in BC, Alberta, and across the country.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "BC Movers is a local moving company with local values. Dedication, hardwork and professionalism. We believe that every job should be done as carefully as if our own belongings were being moved.";

const app = express();



app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/finalDB", { useNewUrlParser: true });
app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));


const moves = require("./routes/move");
app.use("/moves", moves);

// Route to Bitcoin API
const bitcoin = require("./routes/bitcoin");
app.use(bitcoin);

app.get("/bitcoin", (req, res) => {
  res.render("index", { amount: undefined })

});

// app.get("/moves", (req, res) => {
//   res.render("/moves/index");
// });
// app.get("/moves", (req, res) => {
//   res.render("/moves/create");
// });
// app.get("/moves", (req, res) => {
//   res.render("/moves/update");
// });
// app.get("/moves", (req, res) => {
//   res.render("/moves/show");
// });

app.post("/index", (req, res) => {
  //   console.log(req.body.crypto);

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function (error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;

    console.log(price);

    var currentDate = data.time;

    res.render("index", { data, price, currentDate, amount, crypto, fiat });
  });
});



app.get("/homepage", (req, res) => {
  res.render("homepage");
})


const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {

  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save();
  res.redirect("/");

});

app.get("/posts/:postName", function (req, res) {

  // const requestedTitle = _.lowerCase(req.params.postName);
  Post.findOne({ _id: req.params.postName }, (err, post) => {
    console.log(post, err);
    res.render("post", { post });
  })
  // posts.forEach(function (post) {
  //   const storedTitle = _.lowerCase(post.title);

  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.connect
  //     });
  //   }
  // });

});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
