var model = require("../models/product.model");
var modelTl = require("../models/category.model");
var moment = require("moment");
var fs = require("fs");

exports.getList = async (req, res) => {
  const name = req.query.namefilter; // lấy giá trị tên từ tham số truyền lên
  const category = req.query.categoryfilter; // lấy giá trị chức vụ từ tham số truyền lên
  const price = req.query.pricefilter; // lấy giá trị trạng thái từ tham số truyền lên

  // Tạo một đối tượng query để lọc dữ liệu từ MongoDB sử dụng Mongoose
  const query = {};

  // Kiểm tra các giá trị truyền lên, nếu có thì thêm vào đối tượng query
  if (name) {
    query.name = name;
  }

  if (category) {
    query.id_theloai = category;
  }
  // "ObjectId('" + category + "')";
  if (price) {
    // Kiểm tra giá trị của status
    if (price === "1") {
      query.price = { $lt: 1000000 };
    } else if (price === "2") {
      query.price = { $gte: 1000000, $lte: 5000000 };
    } else if (price === "3") {
      query.price = { $gt: 5000000 };
    }
  }

  let msg = "";
  let dataSet = await model.pro.find(query).populate("id_theloai");
  let listTl = await modelTl.cate.find();
  res.render("./products", {
    layout: "../views/layouts/layout",
    title: "Product Management",
    listTl: listTl,
    list: dataSet,
    msg: msg,
    moment: moment,
  });
};

exports.addProduct = async (req, res) => {
  var url = "";
  let listTl = await modelTl.cate.find();
  const formType = req.body.formType;
  let msg = "";

  if (req.method == "POST") {
    console.log(req.file);
    console.log(req.body);
    try {
      fs.renameSync(req.file.path, "./public/images/" + req.file.originalname);
      url = req.file.originalname;

      console.log("url: http://localhost:3000/images/" + req.file.originalname);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }

  console.log(url + "đây là url ảnh");
  if (formType === "form1") {
    console.log("add");
    if (req.method == "POST") {
      let obj = new model.pro();
      obj.name = req.body.name;
      obj.price = req.body.price;
      obj.description = req.body.description;
      obj.img = url;
      obj.id_theloai = req.body.theloai;

      try {
        let newpro = await obj.save();
        msg = "Successfully Added";
      } catch (error) {
        if (error) {
          console.log(error);
          msg = "Error: " + error;
        }
      }
    }
  } else if (formType === "form2") {
    const id = req.body.idupdate;
    msg = req.body.idupdate;
    if (req.method == "POST") {
      let objupdate = new model.pro();
      objupdate.name = req.body.nameupdate;
      objupdate.price = req.body.priceupdate;
      objupdate.description = req.body.descriptionupdate;
      objupdate.img = url;
      objupdate.id_theloai = req.body.theloaiupdate;

      objupdate._id = id;

      try {
        await model.pro.findByIdAndUpdate(id, objupdate);
        msg = "Update Successful";
      } catch (error) {
        console.log(error);
        msg = "Error: " + error;
      }
    }
  } else if (formType == "form3") {
    let iddlt = req.body.iddelete;
    if (req.method == "POST") {
      try {
        await model.pro.findByIdAndDelete(iddlt);
        msg = "Delete Successfull";
      } catch (error) {
        if (error) {
          console.log(error);
          msg = "Error: " + error;
        }
      }
    }
  }

  let dataSet = await model.pro.find().populate("id_theloai");
  res.render("./products", {
    layout: "../views/layouts/layout",
    title: "Product Management",
    listTl: listTl,
    list: dataSet,
    msg: msg,
    moment: moment,
  });
};
