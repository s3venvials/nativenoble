const { CreateUser } = require("./user.create");
const { ForgotPassword } = require("./user.forgotpassword");
const { ResetPassword } = require("./user.resetpassword");

module.exports = {
    CreateUser,
    ForgotPassword,
    ResetPassword
}