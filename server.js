/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
**  Name: ANUJ PATEL Student ID: 165811217 Date: 05-FEB-2023

*  Cyclic Web App URL: https://doubtful-hen-jodhpurs.cyclic.app
*
*  GitHub Repository URL: https://github.com/anujpatel5123/web322-app.git
*
********************************************************************************/ 


const express = require("express");
const path = require('path');
const app = express();
const {initialize, getAllPosts, getPublishedPosts, getCategories} = require("./blog-service")

app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'views')));
var HTTP_PORT = process.env.PORT || 8080;

//home route
app.get("/", (req,res)=>{
    res.redirect("/about");
})

//about route
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