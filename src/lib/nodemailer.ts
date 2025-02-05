import getBaseUrl from "../utils/baseUrl";
import config from "../config";
const nodemailer = require('nodemailer');

export const transporter = () => {
    return nodemailer.createTransport({
        host: config.NODEMAILER_HOST,
        port: config.NODEMAILER_PORT,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: config.NODEMAILER_USERNAME,
            pass: config.NODEMAILER_PASSWORD,
        },
    });
}

export const mailOptions = (email : string , token : string) => {
    return {
    from: config.NODEMAILER_EMAIL,
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${getBaseUrl}/reset-password/${token}`,
}};
export default {
    transporter,
    mailOptions,
}
