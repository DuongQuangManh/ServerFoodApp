exports.requestLogin = (req, res, next) => {
  console.log(req.session.userLogin);
  if (req.session.userLogin) {
    next();
  } else {
    res.redirect("/formlogin");
  }
};
