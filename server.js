const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()
const puppeteer = require('puppeteer');
const app = express();
const db = require('./models');
const PORT = 3001;



app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
mongoose.connect("mongodb://localhost/andTabDatabase")
// const connection = mongoose.createConnection('mongodb://localhost/andTabDatabase');
// autoIncrement = require('mongoose-auto-increment');


app.get("/scrape", async(req, res) => {
  // puppeteer routine (chrome://inspect/#devices scrape)...
  
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: `${process.env.CHROMEUSERDATAPATH}`,
      executablePath: `${process.env.CHROMEPATH}`,
      args: ['--remote-debugging-port=9222']
    });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.goto('chrome://inspect/#devices');
    let gdata = await page.evaluate( async () => { 
      let data = []
      
      function writeData(d) {
        return new Promise(resolve => {
        let elements = document.getElementsByClassName('url');
      
        for (let item of elements) {
        
         d.push({
          title: item.parentElement.innerText,
          url: item.innerHTML
          
      })}
      
      resolve(console.log("is succes"))
        })
      }  
      
      function remoteDeviceDelay() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve("Delay")
          }, 8000);
        });
      };
      await remoteDeviceDelay();
      await writeData(data)
      return data
    })
    await writeDB(gdata)  
     
});
    // trim the chrome extensions trash
    // await gdata.filter((x) => !x.title.includes("extension") && !x.url.includes("extension") )
    // create a new article using the results from the scrape
    


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

function writeDB(d) {
  return new Promise(resolve => {
    for (let i = 0; i < d.length; i++) {
      db.Article.create(d[i])
      .then(function(dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        return res.json(err);
      });
      console.log(d[i]);
    }
  })
  
}