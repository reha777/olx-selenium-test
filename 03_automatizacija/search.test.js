const { By, until, Key } = require("selenium-webdriver");
const assert = require("assert");
const { getDriver } = require("./hooks");
const { acceptCookiesIfPresent } = require("./setup");

describe("OLX.ba Search", function () {
  this.timeout(30000);

  it("Should search for cars on OLX.ba", async function () {
    const driver = getDriver();

    await driver.get("https://www.olx.ba");
    await acceptCookiesIfPresent(driver);

    const searchInput = await driver.wait(
      until.elementLocated(
        By.css('input[placeholder*="Pretra"]')
      ),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({ block: 'center' });",
      searchInput
    );

    await searchInput.click();
    await searchInput.sendKeys("auto", Key.ENTER);

    await driver.wait(
      until.urlContains("olx.ba"),
      10000
    );

    const currentUrl = await driver.getCurrentUrl();
    assert.ok(
      currentUrl.includes("olx.ba"),
      "Application crashed or navigated away on valid search"
    );
  });
});
