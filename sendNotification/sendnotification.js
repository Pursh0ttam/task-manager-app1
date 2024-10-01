const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service:"gmail",
    auth: {
         user:"moheetmishra.gaya@gmail.com",
        pass:"pattwzbygxyptadw"
    }
})

let sendmail =async(email,pendingTask=[],msg)=>{
    try{
        let setVAl = await transport.sendMail({
            from:"moheetmishra.gaya@gmail.com",
            to:email,
            subject:"Please complete your pending task",

            html:`<h1>These are your pending tasks</h1> ${msg}
             ${pendingTask}`       
      
        })
        console.log("Email send successsfully",setVAl.response)
    }catch(error){
        console.error('Error sending email:', error);
    }
}

// sendmail()
module.exports={sendmail}