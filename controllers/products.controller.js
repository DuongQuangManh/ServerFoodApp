exports.getList = (req, res) => {
  res.render("./products", {
    layout: "../views/layouts/layout",
    title: "Product Management",
  });
};
