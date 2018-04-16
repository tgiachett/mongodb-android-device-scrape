require('dotenv').config()
const puppeteer = require('puppeteer');
let gdata;
(async () => {
  
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: `../Users/${process.env.USER}/AppData/Local/Google/Chrome/User Data/`,
    executablePath: '../Program Files (x86)/Google/Chrome/Application/chrome'
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
  
  
})();






