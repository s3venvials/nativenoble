let bcrypt = require("bcryptjs");

let ResetPassword = async (userModel, token, password) => {

    let response = { Message: null, User: null, Error: null };

    try {

        let user;

        if (!token) {
            response.Error = "Please provide a valid token to proceed.";
        } else {
            user = await userModel.findOne({ resetPasswordToken: token });

            if (!user) {
                response.Error = "The provided token has expired or has already been used.";
                return Promise.resolve(response);
            }
        }

        if (password) {
            let salt = bcrypt.genSaltSync();
            user.hash = bcrypt.hashSync(password, salt);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.token = undefined;
        } else {
            response.Error = "Please provide a new password."
            return Promise.resolve(response);
        }

        //copy userParam properties to user
        Object.assign(user);

        await user.save();

        response.Message = "Your password was successfully reset!";
        response.User = user;
        return Promise.resolve(response);

    } catch (error) {

        return Promise.reject(error);

    }
}

module.exports = { ResetPassword };