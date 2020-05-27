const moment = require("moment");

const getCurrentDate = () => {
    return moment().format('DD/MM/YYYY');
};

const getScreenshotPath = () => {
    return `./screenshots/${moment(new Date()).format("YYYYMMDDX")}.jpg`;
};

const getTimeDifference = (start, end, format = "MMMM DD YYYY HH:mmA") => {
    start = moment(start, format);
    end = moment(end, format);
    return end.diff(start, "hours", true);
};

const isRequestValid = (body) => {
    if (body.date) {
        return moment(body.date, 'DD/MM/YYYY', true).isValid();
    }
    return body.url && body.username && body.password;
};

module.exports = {
    getCurrentDate,
    getScreenshotPath,
    getTimeDifference,
    isRequestValid,
};

