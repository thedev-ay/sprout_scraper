const { RESPONSE } = require("./constants");

const error = (res, message, code = RESPONSE.INTERNAL_SERVER_ERROR) => {
    console.log(message);
    res.status(code).json({ errorMessage: message });
};

const success = (res, data, code = RESPONSE.OK) => {
    res.status(code).json(data)
};

module.exports = {
    error, success, RESPONSE
}