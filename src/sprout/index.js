const sprout = require("./scraper");
const util = require("../common/util");

const timein = async (url, username, password) => {
    await sprout.initialize(url);

    await sprout.login(username, password);

    await sprout.timein();

    const biologs = await sprout.checkBiologs(util.getCurrentDate());

    sprout.close();

    return biologs;
};

const timeout = async (url, username, password) => {
    await sprout.initialize(url);

    await sprout.login(username, password);

    await sprout.timeout();

    const biologs = await sprout.checkBiologs(util.getCurrentDate());

    sprout.close();

    return biologs;
};

const getBiologs = async (url, username, password, date) => {
    await sprout.initialize(url);

    await sprout.login(username, password);

    const biologs = await sprout.checkBiologs(date);

    sprout.close();
    
    return biologs;
};

module.exports = {
    timein, timeout, getBiologs
}