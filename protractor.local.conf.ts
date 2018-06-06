export const config = require('./protractor.conf').config;

config.seleniumAddress = 'http://localhost:4444/wd/hub';
config.capabilities = {
    maxInstances: config.maxThreads,
    shardTestFiles: (config.maxThreads !== 1),
    browserName: 'chrome',
    enableVNC: true,
    version: '65.0',
    chromeOptions: {
        args: ['--window-size=800,600', '--no-sandbox'],
    }
};