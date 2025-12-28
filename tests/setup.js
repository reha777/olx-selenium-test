async function acceptCookiesIfPresent(driver) {
  try {
    await driver.executeScript(`
      const el = document.querySelector('.qc-cmp-cleanslate');
      if (el) el.remove();
      document.body.style.overflow = 'auto';
    `);
  } catch (e) {}
}

module.exports = {
  acceptCookiesIfPresent,
};
