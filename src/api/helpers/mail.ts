import nodemailer from "nodemailer"
const emailTextF = (numberToken: string, jwtToken:string) => {
    let text = `<div
      style="
        width: 400px;
        margin: 0 auto;
        background-color: #f9f9fb;
        padding: 20px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div>
        <p style="text-align: center; color: #757575; font-family: cursive;">
         Here this your 4 digit password reset pin
        </p>
        <p style="text-align:center; font-size:32px; font-weight:700; color:black;">
        ${numberToken}
        </p>
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 0;
          "
        >
          <button
            style="
              border: none;
              background: #00000;
              border-radius: 10px;
              padding: 15px 60px;
            "
          >
            <a
              href="http://localhost:3000/forgotpassword/pin?verification=${jwtToken}"
              style="color: white; text-decoration: none; font-family: cursive;" 
              >Click </a
            >
          </button>
        </div>
      </div>
    </div>`;
    return text
    
}

export const sendMail = async (userEmail:string, numberToken:string, jwtToken:string) => {
   try {
       const mailInfo = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user:`${process.env.APP_EMAIL}`,
               pass: `${process.env.EMAIL_PASS}`,
               
           }
       })
       const email = emailTextF(numberToken, jwtToken)
          const mailOption = {
                from: '',
                to: `${userEmail}`,
                subject: 'Forgot Password',
                text: '',
                html:`${email}`
                
            }
            const sendMailF =  await mailInfo.sendMail(mailOption)

   } catch (error) {
    return new Error("An error occured sending mail")
   }
}
