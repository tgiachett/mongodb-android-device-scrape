# mongodb-nytimes-scrape

Scrapes chrome inspect for android tabs

NOTE: Site must be accessed with browser other than Chrome to make way for puppeteer. (WIP)

WARNING: USING NON DEV CHROME INSTANCE COULD RESULT IN UNKNOWN PROBLEMS. USE AT YOUR OWN RISK. DELETE argument `executablePath` in puppeteer launch to use chromium instead. DELETE argument `userDataDir ` to not use your chrome data folder(may not yield any *tabs data). 

USE

Create .env file with:
`CHROMEPATH=[relative path to chrome.exe]`
`CHROMEUSERDATEPATH=[relative path to chrome user data]` 
For example, on windows 10: ../Users/[User]/AppData/Local/Google/Chrome/User Data/
Use command `node server.js`

