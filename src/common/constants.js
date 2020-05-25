const RESPONSE = {
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
};

const SPROUT = {
    PAGE: {
        BIOLOGS: "/MyBiologs.aspx"
    },
    COMPONENT: {
        LOGIN_ID_FIELD: "input[name='txtUsername']",
        LOGIN_PASSWORD_FIELD: "input[name='txtPassword']",
        LOGIN_BUTTON: "#btnLogIn",
        BIOLOGS_DATE_FROM_FIELD: "input[id='txtdatefrom']",
        BIOLOGS_DATE_TO_FIELD: "input[id='txtdateto']",
        BIOLOGS_SEARCH_BUTTON: "#Button1",
        BIOLOGS_LIST: "#MainContent_UpdatePanelContent table > tbody > tr",
        DASHBOARD_OK_INDICATOR: "[data-bind='click: toggleClock']",
        CLOCK_TOGGLE_ICON: "div.clock-icon",
        CLOCK_POP_UP_INDICATOR: "div.clock-pop-up",
        CLOCK_POP_UP_TIMEIN: "div.clock-pop-up ul li[data-bind='click: webBundyLogIn']", 
        CLOCK_POP_UP_TIMEOUT: "div.clock-pop-up ul li[data-bind='click: webBundyLogOut']", 
        MODAL_TIMEIN_INDICATOR: "//h4[contains(text(), 'Log In')]",
        MODAL_TIMEIN_BUTTON: "button.our-button",
        MODAL_TIMEOUT_INDICATOR: "//h4[contains(text(), 'Log Out')]",
        MODAL_TIMEOUT_BUTTON: "button.our-button",
        MODAL_CONFIRM_OK: "button[data-bb-handler='ok']",
    }
}

module.exports = {
    RESPONSE,
    SPROUT,
}