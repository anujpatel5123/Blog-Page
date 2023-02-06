const fs = require('fs');
const { resolve } = require('path');
const path = require("path");


let posts = [];
let categories = [];


function initialize() {

    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "data", "posts.json"), 'utf8', (err, data) => {
            if (err) {
               
              reject("Unable to read posts file");
            }

            
            posts = JSON.parse(data);

           
            fs.readFile(path.join(__dirname, "data", "categories.json"), 'utf8', (err, data) => {
                if (err) {
                 
                  reject("Unable to read categories file");
                }

               
                categories = JSON.parse(data);

             
                resolve();
              });
          });
    })
}


function getAllPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject("No results returned");
        } else {
            resolve(posts);
        }
    })
}


function getPublishedPosts() {
    return new Promise((resolve, reject) => {
        let publishedPosts = [];
        posts.forEach((post) => {
            if (post.published === true) {
                publishedPosts.push(post);
            }
        })

        if (publishedPosts.length > 0) {
            resolve(publishedPosts);
        } else {
            reject("No results returned");
        }
    })    
}

 
function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject("No results returned");
        } else {
            resolve(categories);
        }
    })
}

module.exports = { initialize, getAllPosts, getPublishedPosts, getCategories };