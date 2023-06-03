import sendEmail from "../sendEmail.js";

export const sendForgotPasswordEmail = (
  user,
  resetPasswordUrl,
  resetPasswordUrlM
) => {
  //Mail Options
  const mailDetails = {
    to: user.email,
    subject: "NoteTake - Password Reset",
    // text: `Hi, ${user.name} \nPlease click below to reset your password for NoteTake. If you did not request a new password, please ignore this email.\n
    // ${resetPasswordUrl}`,
    html: `
        <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Reset Password</title>
        <link href="style.css" rel="stylesheet" type="text/css" />
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,400&display=swap');
    
            * {
                line-height: 1.5;
            }
    
            body {
                background-color: hsl(214, 32%, 91%);
                font-family: 'Work Sans', sans-serif;
            }
    
            .title {
                text-align: center;
                font-size: 1.75rem;
                /* line-height: 2; */
            }
    
            .container {
                width: 80%;
                margin: auto;
                background-color: #fff;
                padding: 2rem;
                border-radius: .5rem;
            }
    
            .resetBtn {
                display: inline-block;
                text-align: center;
                margin: 1rem auto;
                padding: .5rem 1rem;
                background-color: hsl(235, 40%, 53%);
                border-radius: .4rem;
                text-decoration: none;
                font-weight: 600;
                color: #fff;
            }
            .resetBtn:visited{
              color:#fff;
            }
    
            .alternate {
                font-size: .75rem;
                display: grid;
                gap: .5rem;
            }
        </style>
    </head>
    
    <body>
        <h1 class="title">Forgot your Password?</h1>
        <div class="container">
            <p>Hi ${user.name},</p>
            <p>Someone has requested to reset your NoteTake Password. Please click the link below to reset your password. <br/>This link will expire in 10 minutes.
            </p>
            <a href="${resetPasswordUrl}" class="resetBtn">Reset your
                Password</a>
            <p>If you didn't make this request, please ignore this email.</p>
            <p>Thanks, <br />The NoteTake Team</p>
            <hr />
            <div class="alternate">
                <p>If you are having trouble with the button above, copy and paste the URL below in your browser.</p>
    
                <a
                    href='${resetPasswordUrl}'>${resetPasswordUrl}</a>
                <a href="${resetPasswordUrlM}">For Mobile Users
                    (Developement
                    Reasons)</a>
            </div>
    
        </div>
       
    </body>
    
    </html>`,
  };

  //   Sending Email
  sendEmail(mailDetails);
};

export const sendResetPasswordEmail = (user) => {
  //Mail Options
  const mailDetails = {
    to: user.email,
    subject: "NoteTake Password Changed",
    // text: `Hi, ${user.name} \nPlease click below to reset your password for NoteTake. If you did not request a new password, please ignore this email.\n`,
    html: `<!DOCTYPE html>
        <html>
        
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <title>Password Changed</title>
            <link href="style.css" rel="stylesheet" type="text/css" />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,400&display=swap');
        
                * {
                    line-height: 1.5;
                }
        
                body {
                    background-color: hsl(214, 32%, 91%);
                    font-family: 'Work Sans', sans-serif;
                }
        
                .title {
                    text-align: center;
                    font-size: 2rem;
                    /* line-height: 2; */
                }
        
                .container {
                    width: 80%;
                    margin: auto;
                    background-color: #fff;
                    padding: 2rem;
                    border-radius: .5rem;
                }
            </style>
        </head>
        
        <body>
            <h1 class="title">Your Password has been changed.</h1>
            <div class="container">
                <p>Hi ${user.name},</p>
                <p>Your password has been changed, as you asked.
                </p>
                <p>Thanks, <br />The NoteTake Team</p>
        
        
            </div>
        </body>
        </html>`,
  };

  //Sending Email
  sendEmail(mailDetails);
};
