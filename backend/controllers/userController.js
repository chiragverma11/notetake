import validator from "validator";
import crypto from "crypto";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import sendCookie from "../utils/sendCookie.js";
import sendEmail from "../utils/sendEmail.js";

//SignUp Controller
const signupUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please fill out all required fields", 400));
  }

  let errors = [];
  //Email and Password Validation
  if (!validator.isEmail(email)) {
    errors.push("Please Enter valid Email Address");
    // return next(new ErrorHandler("Please Enter valid Email Address", 400));
  }
  if (!validator.isLength(password, { min: 3 })) {
    errors.push("Password must be atleast 3 characters");
    // return next(new ErrorHandler("Password must be atleast 3 characters", 400));
  }
  if (errors.length > 0) {
    return next(new ErrorHandler(errors, 400));
  }

  const user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("Email Already Exists", 403));
  }
  const newUser = await User.create({
    name,
    email,
    password,
  });
  sendCookie(newUser, 201, res);
});

//Login Controller
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill out all required fields", 400));
  }

  //Email and Password Validation
  if (!validator.isEmail(email)) {
    return next(new ErrorHandler("Please Enter valid Email Address", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User doesn't exist", 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect Password", 401));
  }
  sendCookie(user, 200, res);
});

//Logout Controller
const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//LoadUser Controller
const loadUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne(req.user._id);

  res.status(200).json({
    success: true,
    userDetails: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

//Forgot Password Controller
const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return next(new ErrorHandler("User doesn't exist", 401));

  //Generating Reset Password Token
  const resetToken = await user.getResetPasswordToken();

  //Saving Token to Database
  await user.save();

  //Reset Password Url
  const resetPasswordUrl = `${req.protocol}://${req.hostname}:${process.env.FRONTEND_PORT}/reset-password/${resetToken}`;
  const resetPasswordUrlM = `${req.protocol}://192.168.1.6:${process.env.FRONTEND_PORT}/reset-password/${resetToken}`;

  console.log(resetPasswordUrl); //Just to get Reset Url directly from Console

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
  sendEmail(mailDetails);

  res.status(200).json({
    success: true,
    message: "Forgot Password Email Sent",
  });
});

//Reset Password Controller
const resetPassword = catchAsyncError(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  //Hashing Token received in Params
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //Finding Hashed resetToken the User Database with Expiry time left
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password are not same", 406)
    );
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  //Saving Token to Database
  await user.save();

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
  sendEmail(mailDetails);

  res.status(200).json({
    success: true,
    message: "Password Reset Successful",
  });
});

export {
  signupUser,
  loginUser,
  logoutUser,
  loadUser,
  forgotPassword,
  resetPassword,
};
