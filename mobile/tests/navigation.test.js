const { remote } = require('webdriverio');
const assert = require('assert');
const HomePage = require('../pages/HomePage');

describe('Mobile Navigation Test', function () {
    this.timeout(60000);

    let driver;
    let homePage;

    before(async () => {
        const capabilities = {
            platformName: 'Android',
            'appium:deviceName': 'Android Emulator',
            'appium:automationName': 'UiAutomator2',
            'appium:appPackage': 'com.example.android',
            'appium:appActivity': '.MainActivity'
        };

        driver = await remote({
            path: '/wd/hub',
            port: 4723,
            capabilities
        });

        homePage = new HomePage(driver);
    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });

    it('should tap element and navigate to next page', async () => {
        await homePage.tapMenuButton();
        const isDisplayed = await homePage.isNextPageDisplayed();
        assert.strictEqual(isDisplayed, true, 'Next page did not open');
    });
});
