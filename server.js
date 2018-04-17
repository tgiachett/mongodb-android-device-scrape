const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()
const puppeteer = require('puppeteer');
const app = express();
const db = require('./models');
const port = 3000;

let gdata;

app.use(logger("dev"));
app.use(bodyParse.urlencoded({ extended: true}));
app.use(express.static('public'));
mondgoose.connect("mongodb://localhost/andTabDatabase")

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
  await page.evaluate(async () => { 
    let data = []
    try {
    let arr = setTimeout(async () => {
      let elements = document.getElementsByClassName('url');
      
      for (let item of elements) {
        
        await data.push({
          url: item.innerHTML,
          desc: item.parentElement.innerText
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

  // create a new article using the results from the scrape




  await res.send("Scrape Compete");
})();


})

app.get("/articles")



