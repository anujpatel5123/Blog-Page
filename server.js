const express = require("express");
const path = require('path');
const app = express();
const {initialize, getAllPosts, getPublishedPosts, getCategories} = require("./blog-service")

app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'views')));
var HTTP_PORT = process.env.PORT || 8080;


app.get("/", (req,res)=>{
    res.redirect("/about");
})


app.get("/about", (req,res)=>{
    res.sendFile(__dirname + '/views/about.html');
})


//blog route
app.get("/blog", (req, res) => {
    getPublishedPosts()
    .then((data) => {
      res.send(data)
    })
    // Error Handling
    .catch((err) => {
      res.send(err);
    })
  });



//posts route
app.get("/posts", (req, res) => {
    getAllPosts()
      .then((data) => {
        res.send(data)
      })
      // Error Handling
      .catch((err) => {
        res.send(err);
      })
  });


//Categories Route
app.get("/categories", (req, res) => {
    getCategories()
    .then((data) => {
      res.send(data)
    })
    // Error Handling
    .catch((err) => {
      res.send(err);
    })
  })






initialize().then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("Express http server listening on: " + HTTP_PORT);
    });
})