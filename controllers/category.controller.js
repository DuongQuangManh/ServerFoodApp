exports.getList = (req, res) => {
  res.render("./categories", {
    layout: "../views/layouts/layout",
    title: "Manage categories",
  });
};
