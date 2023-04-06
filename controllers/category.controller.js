var model = require("../models/category.model");
var modelpro = require("../models/product.model");
exports.getList = async (req, res) => {
  let msg = "";
  let dkloc = null;
  console.log(req.query.code);
  if (typeof req.query.code != "undefined") {
    dkloc = { code: req.query.code };
  }
  let list = await model.cate.find(dkloc);
  res.render("./categories", {
    layout: "../views/layouts/layout",
    title: "Manage categories",
    list: list,
    msg: msg,
  });
};
exports.add = async (req, res) => {
  let msg = "";
  if (req.body.formsubmit == "form1") {
    if (req.method == "POST") {
      let obj = new model.cate();
      obj.code = req.body.code;
      obj.name = req.body.name;

      try {
        let newsp = await obj.save();
        console.log(newsp);
        msg = "Successfully Added";
      } catch (error) {
        if (error) {
          console.log(error);
          msg = "Error: " + error;
        }
      }
    }
  } else if (req.body.formsubmit == "form2") {
    let id = req.body.idupdate;
    if (req.method == "POST") {
      let objupdate = new model.cate();
      objupdate.code = req.body.codeupdate;
      objupdate.name = req.body.nameupdate;
      objupdate._id = id;

      try {
        await model.cate.findByIdAndUpdate(id, objupdate);
        msg = "Update Successful";
      } catch (error) {
        if (error) {
          console.log(error);
          msg = "Error: " + error;
        }
      }
    }
  } else if (req.body.formsubmit == "form3") {
    let iddlt = req.body.iddelete;
    console.log(iddlt);
    if (req.method == "POST") {
      try {
        await model.cate.findByIdAndDelete(iddlt);
        msg = "Delete Successfull";
        await modelpro.pro.deleteMany({ id_theloai: iddlt });
      } catch (error) {
        if (error) {
          console.log(error);
          msg = "Error: " + error;
        }
      }
    }
  }

  let list = await model.cate.find().sort({ name: 1 });
  res.render("./categories", {
    layout: "../views/layouts/layout",
    title: "Manage categories",
    list: list,
    msg: msg,
  });
};
