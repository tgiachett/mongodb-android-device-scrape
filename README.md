# mongodb-nytimes-scrape

Scrapes chrome inspect for android tabs<br>
<br>
NOTE: Site must be accessed with browser other than Chrome to make way<br> for puppeteer. (WIP)

WARNING: USING NON DEV CHROME INSTANCE COULD RESULT IN UNKNOWN <br>PROBLEMS. USE AT YOUR OWN RISK. DELETE argument `executablePath` <br>in puppeteer launch to use chromium instead. DELETE argument `userDataDir ` to not use your chrome data folder(may not yield any <br>*tabs data). 

USE

Create .env file with:<br>
`CHROMEPATH=[relative path to chrome.exe]`<br>
`CHROMEUSERDATEPATH=[relative path to chrome user data]` <br>
For example, on windows 10: ../Users/[User]<br>/AppData/Local/Google/Chrome/User Data/
Use command `node server.js`

<br>