const { By, until, Key } = require("selenium-webdriver");
const assert = require("assert");
const { getDriver } = require("./setup");

describe("OLX.ba Search", function () {
  this.timeout(30000);

  it("Should search for cars on OLX.ba", async function () {
    const driver = getDriver();

    await driver.get("https://www.olx.ba");

    // Accept cookies (ako se pojave)
    try {
      const acceptCookies = await driver.wait(
        until.elementLocated(By.xpath("//button[contains(text(),'Prihvatam')]")),
        5000
      );
      await acceptCookies.click();
    } catch (e) {}

    const searchInput = await driver.wait(
      until.elementLocated(By.css('input[placeholder*="Pretra"]')),
      10000
    );

    await searchInput.sendKeys("auto", Key.ENTER);

    // ✅ VALIDACIJA PRETRAGE (stabilna)
    await driver.wait(
      until.urlContains("auto"),
      10000
    );

    const currentUrl = await driver.getCurrentUrl();
    assert.ok(
      currentUrl.includes("auto"),
      "Search query not present in URL"
    );
  });
});
