exports.getList = (req, res) => {
  res.render("./users", {
    layout: "../views/layouts/layout",
    title: "User Management",
  });
};
