var assert = require('assert');

describe('read page title of http://webdriver.io', () => {
    it('webdriver.io has the expected page title', () => {
        return browser
            .url('http://webdriver.io')
            .getTitle().then((title) => {
                assert.equal(title, 'WebdriverIO - Selenium 2.0 javascript bindings for nodejs');
            });
    });
});