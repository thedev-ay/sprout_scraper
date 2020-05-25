const sprout = require("../sprout/");
const { SETUP } = require("../common/config");
const { error, success, RESPONSE } = require("../common/response");
const { getCurrentDate, isRequestValid } = require("../common/util");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());

app.listen(SETUP.PORT, "0.0.0.0", () => {
 console.log(`Server running on port ${SETUP.PORT}`);
});

app.post("/timein", async (req, res, next) => {
    try {
        const body = req.body;

        if (!isRequestValid(body)) {
            return error(res, "Requires url, username and password!", RESPONSE.BAD_REQUEST);
        }

        const result = await sprout.timein(body.url, body.username, body.password);

        return success(res, result);
    } catch (err) {
        return error(res, err.message);
    }
});

app.post("/timeout", async (req, res, next) => {
    try {
        const body = req.body;

        if (!isRequestValid(body)) {
            return error(res, "Requires url, username and password!", RESPONSE.BAD_REQUEST);
        }

        const result = await sprout.timeout(body.url, body.username, body.password);

        return success(res, result);
    } catch (err) {
        return error(res, err.message);
    }
});

app.post("/biologs", async (req, res, next) => {
    try {
        const body = req.body;

        if (!isRequestValid(body)) {
            return error(res, "Requires url, username, password and date(dd/mm/yyyy)!", RESPONSE.BAD_REQUEST);
        }

        const result = await sprout.getBiologs(body.url, body.username, body.password, body.date || getCurrentDate());

        return success(res, result);
    } catch (err) {
        return error(res, err.message);
    }
});

app.get("/ping", (req, res, next) => {
    console.log("ok");

    return success(res, { ping: "ok" });
});