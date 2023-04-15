var model = require("../models/user.model");

exports.login = (req, res, next) => {
  req.session.userLogin = null;
  res.render("login", { layout: "../views/layouts/layout", title: "Manager" });
};

exports.formlogin = async (req, res, next) => {
  let msg = "";
  if (req.method == "POST") {
    try {
      let obj = await model.user.findOne({ email: req.body.email });
      console.log(obj);
      if (obj != null) {
        if (obj.position == false) {
          msg = "Bạn là người dùng không thể đăng nhập !";
        } else {
          if (obj.passwd == req.body.passwd) {
            req.session.userLogin = obj;
            return res.redirect("/home");
          } else {
            msg = "Mật khẩu không chính xác !";
          }
        }
      } else {
        msg = "Tài khoản không tồn tại";
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }
  res.render("formlogin", {
    layout: "../views/layouts/layout",
    title: "Login",
    msg: msg,
  });
};
