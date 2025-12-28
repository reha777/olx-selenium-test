const { Builder } = require("selenium-webdriver");
require("chromedriver");

let driver;

before(async function () {
  this.timeout(30000); // ⏱ Mocha timeout
  driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().setTimeouts({ implicit: 10000 });
});

after(async function () {
  this.timeout(30000); // ⏱ Mocha timeout
  if (driver) {
    await driver.quit();
  }
});

module.exports = {
  getDriver: () => driver,
};
