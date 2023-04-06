var model = require("../models/user.model");
var moment = require("moment");
exports.getList = async (req, res) => {
  const name = req.query.namefilter; // lấy giá trị tên từ tham số truyền lên
  const position = req.query.positionfilter; // lấy giá trị chức vụ từ tham số truyền lên
  const status = req.query.statusfilter; // lấy giá trị trạng thái từ tham số truyền lên

  // Tạo một đối tượng query để lọc dữ liệu từ MongoDB sử dụng Mongoose
  const query = {};

  // Kiểm tra các giá trị truyền lên, nếu có thì thêm vào đối tượng query
  if (name) {
    query.lastname = name;
  }

  if (position) {
    // Kiểm tra giá trị của position
    if (position === "true") {
      query.position = true;
    } else if (position === "false") {
      query.position = false;
    }
  }

  if (status) {
    // Kiểm tra giá trị của status
    if (status === "true") {
      query.status = true;
    } else if (status === "false") {
      query.status = false;
    }
  }
  console.log(query);
  var dataSet = await model.user.find(query);
  let msg = "";
  res.render("./users", {
    layout: "../views/layouts/layout",
    title: "User Management",
    list: dataSet,
    msg: msg,
    moment: moment,
  });
};

exports.addUser = async (req, res) => {
  let msg = "";
  let formtype = req.body.formsubmit;
  if (formtype == "form1") {
    if (req.method == "POST") {
      let obj = new model.user();
      obj.firstname = req.body.firstname;
      obj.lastname = req.body.lastname;
      obj.passwd = req.body.password;
      obj.email = req.body.email;
      obj.status = checkstatus(req.body.status);
      obj.position = check(req.body.position);

      try {
        let newobj = await obj.save();
        console.log(newobj);
        msg = "Successfully Added";
      } catch (error) {
        if (error) {
          console.log(error);
          msg = "Error: " + error;
        }
      }
    }
  } else if (formtype == "form2") {
    let id = req.body.idupdate;
    if (req.method == "POST") {
      let objupdate = new model.user();
      objupdate.firstname = req.body.firstnameupdate;
      objupdate.lastname = req.body.lastnameupdate;
      objupdate.email = req.body.emailupdate;
      objupdate.status = checkstatus(req.body.statusupdate);
      objupdate.position = check(req.body.positionupdate);

      objupdate._id = id;

      try {
        await model.user.findByIdAndUpdate(id, objupdate);
        msg = "Update Successful";
      } catch (error) {
        console.log(error);
        msg = "Error: " + error;
      }
    }
  } else if (formtype == "form3") {
    let iddlt = req.body.iddelete;
    console.log(iddlt);
    if (req.method == "POST") {
      try {
        await model.user.findByIdAndDelete(iddlt);
        msg = "Delete Successfull";
      } catch (error) {
        if (error) {
          console.log(error);
          msg = "Error: " + error;
        }
      }
    }
  }
  var dataSet = await model.user.find();
  res.render("./users", {
    layout: "../views/layouts/layout",
    title: "User Management",
    list: dataSet,
    msg: msg,
    moment: moment,
  });
};

function check(abc) {
  let checkposition = false;

  if (abc === "Admin") {
    checkposition = true;
  } else {
    checkposition = false;
  }
  return checkposition;
}
function checkstatus(abc) {
  let check = true;
  if (abc == "" || abc === "on") {
    check = true;
  } else {
    check = false;
  }
  return check;
}
