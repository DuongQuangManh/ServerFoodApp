exports.home = (req, res, next) => {
  res.render("home", { layout: "../views/layouts/layout", title: "Home" });
};
