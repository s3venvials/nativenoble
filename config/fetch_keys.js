let path = require("path");
let fs = require("fs");
let keyPath = path.join(__dirname, "./keys.json");

module.exports = (() => {
    return JSON.parse(fs.readFileSync(keyPath));
});