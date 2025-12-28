const { Builder } = require("selenium-webdriver");
require("chromedriver");
const { exec } = require("child_process");

let driver;

before(async function () {
  this.timeout(30000);
  driver = await new Builder().forBrowser("chrome").build();
});

after(async function () {
  this.timeout(30000);

  try {
    if (driver) {
      await driver.close(); 
      await driver.quit();  
    }
  } catch (e) {}


  exec("taskkill /F /IM chrome.exe /T", () => {});
  exec("taskkill /F /IM chromedriver.exe /T", () => {});

  process.exit(0);
});

module.exports = {
  getDriver: () => driver,
};
