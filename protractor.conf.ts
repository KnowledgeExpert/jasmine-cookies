import * as allureCookies from 'allure-cookies';
import {Browser, Element} from 'selenidejs';
import {browser} from 'protractor';
import * as jasmineCookies from 'jasmine-cookies';
import {deleteSessionVideo, downloadSessionVideo, hostAndPort} from './utils';
import {createAttachment} from 'allure-cookies';

export let config;
export let sessionId;


config = {

    //protractor
    SELENIUM_PROMISE_MANAGER: false,
    restartBrowserBetweenTests: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',

    //jasmine
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 500000,
        isVerbose: true
    },
    specs: ['./specs/**/*-spec.js'],
    suites: {features: './specs/features/*-spec.js'},
    params: {
        //pega-common-selenidejs-model
        environment: 'test',
        jasmineFilter: 'Foo',
        maxThreads: 1,
        environments: {
            test: {
                url: 'https://kexpert02.pegalabs.io/prweb/PRServlet',
                username: 'olena.kushnir',
                password: 'rules'
            },
            fail: {
                url: 'fail',
                username: 'fail',
                password: 'fail'
            }
        },

        //selenidejs
        selenidejs: {
            windowSize: {
                width: 800,
                height: 600
            },
            timeouts: {
                toWaitElementsInMs: 15000,
                toHardWaitInMs: 6000
            }
        }
    },

    onPrepare: async function () {
        console.log(browser.params.jasmineFilter);
        jasmine.getEnv().addReporter(allureCookies.getJasmineAllureReporter(
            {basePath: './build', resultsDir: 'allure-results'}));

        Element.beforeActionHooks.push(
            async function (element, actionName) {
                allureCookies.runtime.startstep(`${actionName} on element ${await element.toString()}`)
            }
        );

        Element.afterActionHooks.push(
            async function (element, actionName, actionError) {
                if (actionError) {
                    allureCookies.runtime.endstep(false);
                } else {
                    allureCookies.runtime.endstep(true);
                }
            }
        );

        jasmineCookies.setFilter(browser.params.jasmineFilter);
        jasmineCookies.setDefaultHooks({
            beforeEach: async () => {
                await browser.waitForAngularEnabled(false);
                await allureCookies.setScreenshotProvider(Browser.fullpageScreenshot);

                //sessionId = await browser.driver.getSession().then(session => session.getId());
            },
            afterEach: async () => {
                // const buff = await downloadSessionVideo(`http://${hostAndPort}/video/${sessionId}`);
                //
                // // we don`t need to store that video on selenoid anymore
                // await deleteSessionVideo(`http://${hostAndPort}/video/${sessionId}`);
                //
                // // attach video to allure
                // createAttachment("Demo onboarding app test", buff, `video/mp4`);
            }
        });
    }
};