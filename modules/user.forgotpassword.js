let bcrypt = require("bcryptjs");
let { SendResetPassEmail } = require("./sendemail");

let ForgotPassword = async (userModel, userParam) => {

    let response = { Message: null, User: null, Token: null, Error: null };

    try {

        if (!userParam) {

            response.Error = "Please provide your username."
            return Promise.resolve(response);

        }

        let users = await userModel.find({});

        if (users.length === 0) {
            response.Error = `The provided user, ${userParam} does not exist.`
            return Promise.resolve(response, "Test");

        } else {

            for (var i = 0; i < users.length; i++) {

                if (userParam === users[i].username) {

                    let SendResetPassEmailResponse = await SendResetPassEmail(users[i], users[i].username);
                    
                    response.Message = `An email has been successfully sent to ${users[i].username}.`;
                    response.User = users[i];
                    response.Token = SendResetPassEmailResponse.token;
                    return Promise.resolve(response);

                } 
            }

            response.Error = `The provided user, ${userParam} does not exist.`
            return Promise.resolve(response);

        }

    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = { ForgotPassword };