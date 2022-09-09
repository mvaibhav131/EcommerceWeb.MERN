const nodeMailer = require("nodemailer");

const sendEmail = async (options)=>{
    const transporter= nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        // secure:true,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASS,
        },
    });
    const mailOptions ={
        from:process.env.SMTP_EMAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };
    // await transporter.sendMail(mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};

module.exports=sendEmail;