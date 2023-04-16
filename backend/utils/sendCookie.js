const sendCookie = (user = {}, statusCode, res) => {
  const token = user.generateToken();

  const options = {
    maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user });
};

export default sendCookie;
