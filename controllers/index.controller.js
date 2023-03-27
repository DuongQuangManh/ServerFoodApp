exports.login = (req, res, next) => {
  res.render("login", { layout: "../views/layouts/layout", title: "Manager" });
};

exports.formlogin = (req, res, next) => {
  res.render("formlogin", {
    layout: "../views/layouts/layout",
    title: "Login",
  });
};
