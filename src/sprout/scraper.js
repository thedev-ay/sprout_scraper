const puppeteer = require("puppeteer");
const util = require("../common/util");
const { SPROUT } = require("../common/constants");
const { SETUP } = require("../common/config");

const PAGE = SPROUT.PAGE;
const COMPONENT = SPROUT.COMPONENT;

const sprout = {
    baseUrl: null,
    browser: null,
    page: null,

    initialize: async (baseUrl) => {
        sprout.browser = await puppeteer.launch({
            headless: SETUP.HEADLESS,
        });

        sprout.page = await sprout.browser.newPage();

        sprout.baseUrl = baseUrl;

        await sprout.page.exposeFunction('getTimeDifference', util.getTimeDifference);
    },

    login: async (username, password) => {
        console.log("Sprout Login.");

        await sprout.page.goto(sprout.baseUrl, { waitUntil: "networkidle2" });
        
        await sprout.page.type(COMPONENT.LOGIN_ID_FIELD, username, { delay: 10 });
        await sprout.page.type(COMPONENT.LOGIN_PASSWORD_FIELD, password, { delay: 10 });

        await sprout.page.click(COMPONENT.LOGIN_BUTTON);

        try {
            await sprout.page.waitFor(COMPONENT.DASHBOARD_OK_INDICATOR);
            console.log("Successfully logged in to Sprout.");
        } catch (err) {
            console.log("Failed to login.");
            throw new Error("Failed to login.");
        }
    },

    timein: async () => {
        console.log("Clock in.");

        await sprout.page.waitFor(COMPONENT.DASHBOARD_OK_INDICATOR, { timeout: 10000, visible: true });

        await sprout.page.click(COMPONENT.CLOCK_TOGGLE_ICON);

        await sprout.page.waitForSelector(COMPONENT.CLOCK_POP_UP_INDICATOR, { visible: true });

        const timeinBtn = await sprout.page.$(COMPONENT.CLOCK_POP_UP_TIMEIN);

        await timeinBtn.click();

        await sprout.page.waitFor(COMPONENT.MODAL_TIMEIN_INDICATOR, { timeout: 2000, visible: true });

        const confirmTimeinBtn = await sprout.page.$(COMPONENT.MODAL_TIMEIN_BUTTON);

        await confirmTimeinBtn.click();

        await sprout.page.waitFor(500);

        await sprout.page.waitFor(COMPONENT.MODAL_CONFIRM_OK, { timeout: 2000, visible: true });

        await sprout.page.click(COMPONENT.MODAL_CONFIRM_OK);

        console.log("Clock in... done");
    },

    timeout: async () => {
        console.log("Clock out.");

        await sprout.page.waitFor(COMPONENT.DASHBOARD_OK_INDICATOR, { timeout: 10000, visible: true });

        await sprout.page.click(COMPONENT.CLOCK_TOGGLE_ICON);

        await sprout.page.waitForSelector(COMPONENT.CLOCK_POP_UP_INDICATOR, { visible: true });

        const timeoutBtn = await sprout.page.$(COMPONENT.CLOCK_POP_UP_TIMEOUT);

        await timeoutBtn.click();

        await sprout.page.waitFor(COMPONENT.MODAL_TIMEOUT_INDICATOR, { timeout: 2000, visible: true });

        const confirmTimeoutBtn = await sprout.page.$(COMPONENT.MODAL_TIMEOUT_BUTTON);

        await confirmTimeoutBtn.click();

        await sprout.page.waitFor(500);

        await sprout.page.waitFor(COMPONENT.MODAL_CONFIRM_OK, { timeout: 2000, visible: true });

        await sprout.page.click(COMPONENT.MODAL_CONFIRM_OK);

        console.log("Clock out... done");
    },

    checkBiologs: async (date) => {
        console.log("Check biologs.");

        await sprout.page.waitFor(200);

        console.log(`Redirecting to ${sprout.baseUrl}${PAGE.BIOLOGS}`);
        await sprout.page.goto(sprout.baseUrl + PAGE.BIOLOGS , { waitUntil: "networkidle2" });

        await sprout.page.type(COMPONENT.BIOLOGS_DATE_FROM_FIELD, date.replace(/\//g, ""));
        await sprout.page.type(COMPONENT.BIOLOGS_DATE_TO_FIELD, date.replace(/\//g, ""));

        const searchBiologsBtn = await sprout.page.$(COMPONENT.BIOLOGS_SEARCH_BUTTON);

        await searchBiologsBtn.click();
        console.log(`Query biologs on ${date}`);

        await sprout.page.waitFor(500);

        await sprout.page.screenshot({ path: util.getScreenshotPath(), fullPage: true });

        const data = await sprout.page.evaluate(async (COMPONENT) => {
            let timein;
            let timeout;
            let timediff;

            const trs = Array.from(document.querySelectorAll(COMPONENT.BIOLOGS_LIST));
            trs.shift();

            if (trs.length > 0) {            
                const resultTimein = trs.find(tr => tr.children[3].innerText === "In");
                const resultTimeout = trs.find(tr => tr.children[3].innerText === "Out");

                timein = resultTimein ? resultTimein.children[2].innerText : undefined;
                timeout = resultTimeout ? resultTimeout.children[2].innerText : undefined;
                timediff = await window.getTimeDifference(timein, timeout);
            }

            return { timein, timeout, timediff };
        }, COMPONENT);

        console.log(data);

        return data;
    },

    close: () => {
        sprout.browser.close();
    }
}

module.exports = sprout;