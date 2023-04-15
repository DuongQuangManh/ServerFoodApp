var model = require("../../models/user.model");
const bcrypt = require("bcrypt");
var fs = require("fs");
var path = require("path");
exports.listUser = async (req, res, next) => {
  try {
    let data = await model.user.find();
    if (data) {
      return res
        .status(200)
        .json({ data: data, msg: "Lấy dữ liệu thành công" });
    } else {
      return res.status(204).json({ msg: "Dữ liệu không tồn tại" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.reg = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const user = new model.user(req.body);

    user.passwd = await bcrypt.hash(req.body.passwd, salt);

    const token = await user.generateAuthToken();

    let new_u = await user.save();

    return res.status(201).json({ user: new_u, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }

  // res.json( {status: 1, msg: 'Trang đăng ký'});
};

exports.login = async (req, res, next) => {
  try {
    const user = await model.user.findByCredentials(
      req.body.email,
      req.body.passwd
    );
    if (!user) {
      return res.status(401).json({ error: "Sai thông tin đăng nhập" });
    }
    // đăng nhập thành công, tạo token làm việc mới

    const token = await user.generateAuthToken();
    console.log("-----------------------------");
    console.log(req.user);
    console.log("-----------------------------");
    console.log(user);

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

exports.profile = (req, res, next) => {
  console.log(req.user);

  return res.json(req.user);

  // res.json( {status: 1, msg: 'Trang thông tin'});
};

exports.update = async (req, res, next) => {
  let id = req.params.iduser;
  let url = "";
  console.log(id);
  console.log(req.body.firstname);
  console.log(req.body.lastname);
  console.log(req.file);
  if (req.method == "POST" && req.file) {
    const userFolderPath = path.join(__dirname, "../../public/uploads", id);

    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath);
    }

    // Di chuyển ảnh vào thư mục của người dùng
    try {
      fs.renameSync(
        req.file.path,
        path.join(userFolderPath, req.file.originalname)
      );
      url = `${id}/${req.file.originalname}`;
    } catch (error) {
      console.log(error);
    }
  }

  if (req.method == "POST") {
    let obj = new model.user();
    obj.firstname = req.body.firstname;
    obj.lastname = req.body.lastname;
    obj.email = req.body.email;
    if (req.file) {
      obj.img = url;
    }
    obj._id = id;
    try {
      await model.user.findByIdAndUpdate(id, obj);
      return res.status(200).json({ msg: "update thành công" });
    } catch (err) {
      if (err) {
        return res.status(400).json({ msg: "Không lấy được dữ liệu" });
      }
    }
  }
};

exports.changepass = async (req, res, next) => {
  let id = req.params.iduser;
  console.log("đây là changepass ");
  let txtcrpass = req.body.crpass;
  let txtnewpass = req.body.newpass;
  let txtnewpass2 = req.body.newpass2;
  console.log("-----------hihi");
  console.log(id);
  console.log(req.body);
  console.log("----kết");

  // if (req.method == "POST") {
  //   const user = await model.user.findOne({ _id: id });
  //   console.log(user);
  //   const isPasswordMatch = await bcrypt.compare(txtcrpass, user.passwd);
  //   if (!isPasswordMatch) {
  //     console.log("sai pas");
  //     return res.status(401).json({ msg: "Mật khẩu không chính xác" });
  //   }

  //   if (txtnewpass !== txtnewpass2) {
  //     console.log("sai khớp");

  //     return res.status(403).json({ msg: "Mật khẩu không trùng khớp" });
  //   }
  //   const salt = await bcrypt.genSalt(10);
  //   let obj = new model.user();
  //   obj.passwd = await bcrypt.hash(req.body.newpass, salt);
  //   obj._id = id;
  //   try {
  //     await model.user.findByIdAndUpdate(id, obj);
  //     return res.status(200).json({ msg: "update thành công" });
  //   } catch (err) {
  //     if (err) {
  //       return res.status(400).json({ msg: "Không lấy được dữ liệu" });
  //     }
  //   }
  // }
};
exports.logout = async (req, res, next) => {
  try {
    console.log(req.user);
    // req.user.generateAuthToken();
    req.user.token = null; //xóa token
    await req.user.save();
    return res.status(200).json({ msg: "Đăng xuất thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
  //    res.json( {status: 1, msg: 'Trang đăng xuất'});
};