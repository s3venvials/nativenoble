const request = require('request'),
  nodemailer = require("nodemailer"),
  { spawn, exec } = require("child_process"),
  crypto = require("crypto"),
  _ = require("lodash");

let listen = (app, port = 9000, host = "localhost") => {
  return new Promise((resolve, reject) => {
    app.listen(port, host, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(`${host}:${port}`);
      }
    });
  });
}

let sendEmail = (protocol, message) => {
  return new Promise((resolve, reject) => {
    nodemailer.createTransport(protocol).sendMail(message, (err) => {
      if (err) reject(err);
      resolve("Done");
    });
  });
}

let randomBytes = (size) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, (err, buf) => {
      if (err) reject(err);
      resolve(buf);
    });
  });
}

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

const wait = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms)
  });
}

const isArr = (obj) => !!obj && obj.constructor === Array;

const isObject = (item) => {
  return ((item === null) || Array.isArray(item) || typeof item == 'function') ?
    false
    : (typeof item == 'object');
}

const Exec = (cmd) => {
  if (!cmd) {
    result.error = new Error("Command must be given, not " + cmd);
    return Promise.reject(result);
  }
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr, stdout });
      }
      resolve({ error: null, stdout, stderr });
    });
  });
}

const Spawn = (cmd, args, options, errorLogger = (x) => { }, infoLogger = (x) => { }) => {

  let result = { error: null, executed: false, exitcode: null, pid: null };

  if (!cmd || !options) {
    result.error = new Error("Both command and options must be given, not " + cmd + " and " + options);
    return Promise.reject(result);
  }

  if (args && !args.every((arg) => {
    var type = typeof arg;
    return type === "boolean" || type === "string" || type === "number";
  })) {
    result.error = new Error("All arguments must be a boolean, string or number");
    return Promise.reject(result);
  }

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, options);
    result.pid = child.pid;
    child.stdout.on('data', (data) => infoLogger(data.toString()));
    child.stderr.on('data', (data) => errorLogger(data.toString()));

    child.on("error", (error) => {
      result.error = error;
      result.executed = true;
      reject(result);
    });

    child.on('exit', (code) => {
      if (code === 0 || code === 1) {
        result.executed = true;
        result.exitcode = code;
        resolve(result);
      } else {
        result.error = new Error("Command line error. Check parameters/arguments.");
        result.exitcode = code;
        reject(result);
      }
    });
  });
};

let pretty = (thing, debug = false) => {
  if (debug) {
    console.dir(thing, { colors: true, depth: null });
  }
}

let isString = (str) => {
  if (!(typeof (str) === 'string' || str instanceof String)) {
    return false;
  } else {
    return true;
  }
}

var validation = {
  isNotEmpty: (str) => {
    if (!(typeof (str) === 'string' || str instanceof String)) {
      return false;
    } else {
      return /\S+/.test(str);
    }
  },
  isNumber: (str) => /^\d+$/.test(str)
};

let makeDoc = (length) => {
  let text = "";
  let possible = "0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

let isInteger = (n) => {
  if (n === "" || n === null || n === undefined || [true, false].includes(n) || !/^-?\d+$/.test(String(n) || String(n).includes("."))) return false;
  let _n = Number(n);
  if (isNaN(_n)) return false;
  return Number.isInteger(_n);
}

const isBoolean = (val) => {
  return val === false || val === true;
}

let makeId = (length, numbers = true, alpha = true) => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  if (!numbers && alpha) {
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  } else if (numbers && !alpha) {
    possible = "0123456789";
  }

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}


let mergeArrayOfObjectsWithoutDuplicates = (target, source) => {
  let safe = _.cloneDeep(target);
  for (let i = 0; i < source.length; i++) {
    if (!_.some(safe, source[i])) safe.push(source[i]);
  }
  return safe;
}

let saveError = async (error) => {
  let eId = makeId(10);
  try {
    await save(cleanupErrorModel, {
      message: error.message,
      stack: error.stack,
      id: eId
    });
    return Promise.resolve(eId);
  } catch (error) {
    console.log(`mongo_api.js -> saveError: Could not save Error! -> ${error.stack}`);
    return Promise.resolve(null);
  }

}

module.exports = {
  sendEmail,
  randomBytes,
  RequestGet,
  RequestPost,
  isArr,
  isObject,
  isInteger,
  isBoolean,
  Spawn,
  Exec,
  pretty,
  isString,
  validation,
  makeDoc,
  makeId,
  mergeArrayOfObjectsWithoutDuplicates,
  listen,
  wait,
  saveError
};