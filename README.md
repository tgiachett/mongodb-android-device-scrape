EDUCATIONAL WIP

# mongodb-nytimes-scrape

Scrapes chrome inspect for android tabs

<br>NOTE: Site must be accessed with browser other than Chrome to make way for puppeteer chrome instance. 

WARNING: USING NON DEV CHROME INSTANCE COULD RESULT IN UNKNOWN PROBLEMS. USE AT YOUR OWN RISK. DELETE argument `executablePath`in puppeteer launch to use chromium instead. DELETE argument `userDataDir ` to not use your chrome data folder(may not yield any tabs data). 

SETUP:<br>
Create .env file in application root folder containing:<br>
`CHROMEPATH=[relative path to chrome.exe]`<br>
`CHROMEUSERDATEPATH=[relative path to chrome user data]` <br>
 <br>
Run an instance of MongoDB server in a seperate terminal using
<br> `mongod`
<br>USE
<br>1. Connect your computer with your Android phone via USB
<br>2. Enable USB debugging on the phone. NOTE: the first time you run the scrape, you may have to accept the debug connection manually on your phone
<br>3. Type `node server.js` from the application root folder
<br>4. Navigate to localhost:3001 (in non-chrome browser)
<br>5. Chrome tabs will appear in a list with title and url
<br>6. Notes can be saved to each tab entry
