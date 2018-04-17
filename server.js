const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()
const puppeteer = require('puppeteer');
const app = express();
const db = require('./models');
const PORT = 3000;

let gdata;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
mongoose.connect("mongodb://localhost/andTabDatabase")
// const connection = mongoose.createConnection('mongodb://localhost/andTabDatabase');
// autoIncrement = require('mongoose-auto-increment');


app.get("/scrape", (req, res) => {
  // puppeteer routine (chrome://inspect/#devices scrape)...
  (async () => {
    
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: `../Users/${process.env.USER}/AppData/Local/Google/Chrome/User Data/`,
      executablePath: '../Program Files (x86)/Google/Chrome/Application/chrome',
      args: ['--remote-debugging-port=9222']
    });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.goto('chrome://inspect/#devices');
    await page.evaluate(() => { 
      let data = []
      try {
      let arr = setTimeout(() => {
        let elements = document.getElementsByClassName('url');
        
        for (let item of elements) {
          
           data.push({
            title: item.parentElement.innerText,
            url: item.innerHTML
            
        })}
        console.log(data);
        return data
        //takes a little less than 8 seconds to load the remote device data
      },8000);
      
      } catch (err) {
      console.log(err)
      }
      
    });
    // trim the chrome extensions trash
    // await gdata.filter((x) => !x.title.includes("extension") && !x.url.includes("extension") )
    // create a new article using the results from the scrape
    await db.Article.create(gdata)
      .then((dbArticle) => {
        //console log the added result
      }) //send error to client
      .catch((err) =>  res.json(err));

    await res.send("Scrape Compete");
  })();

})

app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


