const nodemailer = require("nodemailer");
require('dotenv').config();
const Mailgen = require('mailgen');
const bcrypt = require('bcrypt');
const { UserOtpVerification } = require("../models/user.otpverification");

const mailforPasswordUpdate = async (req, res) => {
    //'ukxxeyhhugokhgcs'
    //'itsganeshlko02@gmail.com'
    //const { userEmail } = 'karangupta1907@gmail.com';
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`
    const userEmail = req.user.email;
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASS,
        }
    }
    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "KisanCircle",
            link: 'http://localhost:8080/'
        }
    })
    let response = {
        body: {
            name: ` ${req.user.name} OTP verification for KisanCircle`,
            intro: "This is Confidential So please do not share with anyone",
            action: {
                instructions: `Your Verification code is <b>${otp}</b> This code will be expired in <b>10 minutes</b>`,
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'KishanCircle',
                    link: 'http://localhost:8080/'
                }
            },
            outro: "looking forword to do more business",

        }
    }
    let hashotp = await bcrypt.hash(otp, parseInt(process.env.SALT));
    const newOTPVerification = await new UserOtpVerification({
        email: req.user.email,
        otp: hashotp,
        expiresAt: Date.now() + 600000
    });
    await newOTPVerification.save();
    let mail = MailGenerator.generate(response)
    let message = {
        from: process.env.EMAIL,
        //to: 'karangupta1907@gmail.com',
        to: req.user.email,
        subject: "Varification OTP for KisanCircle",
        html: mail
        // html: ` <p>Your Verification code is ${otp} </b> This code will be expired in <b>10 minutes</p>`
    }
    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should recieve an mail"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
}

module.exports = { mailforPasswordUpdate };