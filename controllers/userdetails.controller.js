var model = require("../models/user.model");
var moment = require("moment");
exports.get = async (req, res) => {
  let iduser = req.params.iduser;

  const obj = await model.user.find({ _id: iduser });
  console.log(typeof obj);
  res.render("./userDetail", {
    layout: "../views/layouts/layout",
    title: "Details",
    obj: obj[0],
    moment: moment,
  });
};
// exports.show = (req, res) => {
//   let iduser = req.params.iduser;
//   res.render("./userDetail", {
//     layout: "../views/layouts/layout",
//     title: "Details",
//     iduser: iduser,
//   });
// };
