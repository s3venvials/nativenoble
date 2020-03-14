const request = require('request');

const RequestGet = (url) => {
    return new Promise((resolve, reject) => {
        request.get(url, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

const RequestPost = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        request.post(url, { form: data }, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

module.exports = { RequestGet, RequestPost };