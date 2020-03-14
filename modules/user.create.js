let utils = require("../utils/index");
let bcrypt = require("bcryptjs");

let CreateUser = async (userModel, userParam, req, res) => {
    let response = { Message: null, User: null, Error: null };
    const requiredKeys = ["firstName", "lastName", "username", "password"];
    
    try {
        //check for required keys
        if (Object.keys(userParam).map(key => requiredKeys.includes(key)).includes(false) ||
            requiredKeys.map(key => Object.keys(userParam).includes(key)).includes(false) ||
            Object.keys(userParam).map(key => utils.isString(userParam[key])).includes(false)) {
            response.Error = `Invalid data object, the following keys are required: [\"${requiredKeys.join("\", \"")}\"]`;
            return Promise.resolve(response);
        }

        //Check if user already exist.
        let users = await userModel.find({});

        for (var i = 0; i < users.length; i++) {
            if (bcrypt.compareSync(userParam.username, users[i].username)) {
                response.Error = ("The provided username has already been registered.");
                return Promise.resolve(response);
            }
        }

        let newUser = new userModel(userParam);

        //Save user
        newUser.username = userParam.username;
        await newUser.setPassword(userParam.password);
        await newUser.save();

        response.User = newUser;
        response.Message = "Registration successful!";

        return Promise.resolve(response);

    } catch (error) {
        response.Error = error.toString();
        return Promise.reject(response);
    }
}

module.exports = { CreateUser };