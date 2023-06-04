const sendCookie = (user = {}, statusCode, res) => {
  const token = user.generateToken();

  const userDetails = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  const options =
    process.env.NODE_ENV !== "PRODUCTION"
      ? {
          maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
          // sameSite: "Lax",
          httpOnly: true,
        }
      : {
          maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
          sameSite: "None",
          secure: true,
          httpOnly: true,
          // domain: ".netlify.app",
        };

  //Sending Cookie and Response with status and json
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, userDetails });
};

export default sendCookie;
