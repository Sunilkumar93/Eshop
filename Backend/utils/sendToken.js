const sendToken =async (user, statusCode, res) => {
  const token =await user.getJwtToken();

  // option for cookie
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };


  res.status(statusCode).cookie("token", token, options).send({
    error: false,
    token,
  });
};

module.exports = { sendToken };
