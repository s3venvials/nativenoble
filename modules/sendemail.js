const { sendEmail, randomBytes } = require("../utils");
const keys = require('../config/keys');

let ResetPass = (token, recipientEmail, senderEmail) => {
    return {
        to: recipientEmail,
        from: senderEmail,
        subject: 'Native Noble Password Reset Request',
        html: `
            <h2>
                <img src="https://res.cloudinary.com/frontndev/image/upload/c_scale,h_32/v1580479437/icons8-automation-48_mjb6af.png" alt="gears"/>
                Native Noble
            </h2>

            <div style="border: 1px solid #EEE; border-radius: 25px; text-align: center">
                <div>

                    <h3 style="color: orangered">Account Password Reset</h3>

                    <strong>
                        You are receiving this because you have requested to reset your password for your account on Native Noble.
                        Please click on the following link to complete the process:
                        <a href="http://${keys.hostURI.URL}/user/reset_password/${token}">Reset Link</a>.
                    </strong>
                    <br />
                    <br />
                    <small>Native Noble | Phoenix, AZ</small>
                </div>
            </div>
            `
    }
}


let SendResetPassEmail = async (user) => {
    try {

        let token = await randomBytes(20);

        //format token
        token = token.toString('hex');

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; //1 hour

        await user.save();

        let response = await sendEmail(keys.nodeMailer.transport, ResetPass(token, user.username, keys.nodeMailer.transport.auth.user));
        return Promise.resolve({ response, token });

    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = { SendResetPassEmail };