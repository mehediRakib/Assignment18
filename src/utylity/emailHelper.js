const nodemailer=require('nodemailer');
const SendMail=async (EmailTo,EmailText,EmailSub)=> {
    let transport = nodemailer.createTransport({

        host: "mail.teamrabbil.com",
        port: 25,
        secure: false,
        auth: {user: "info@teamrabbil.com", pass: "~sR4[bhaC[Qs"},
        tls: {rejectUnauthorized: false}

    })
    let option = {
        from: "Assignment<info@teamrabbil.com>",
        to:EmailTo,
        text:EmailText,
        subject:EmailSub
    }

    return await transport.sendMail(option);
}

module.exports=SendMail;