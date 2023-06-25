var model = require("../../models/user.model");
const bcrypt = require("bcrypt");
var fs = require("fs");
var path = require("path");
const { use } = require("../../routes/api");
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
    console.log(user);
    return res.status(200).json({ data: user, token: token });
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
  let id = req.params.id;
  console.log(id);
  let url = "";
  if (req.method == "POST" && req.file) {
    console.log("ddax vafo file img");
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
    obj.phone = req.body.phone;
    if (req.file) {
      console.log("dda xet img");
      obj.img = url;
    } else {
      console.log("meo set img");
    }
    obj._id = id;
    try {
      await model.user.findByIdAndUpdate(id, obj);
      const data = await model.user.findOne({ _id: id });

      return res.status(200).json({ data: data, msg: "update thành công" });
    } catch (err) {
      if (err) {
        console.log(err.message);
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
  console.log("-----------hihi");
  console.log(id);
  console.log(req.body);
  console.log("----kết");

  if (req.method == "POST") {
    try {
      const user = await model.user.findOne({ _id: id });
      console.log(user);
      const isPasswordMatch = await bcrypt.compare(txtcrpass, user.passwd);
      if (!isPasswordMatch) {
        console.log("sai pas");
        return res.status(401).json({ msg: "Mật khẩu không chính xác" });
      }
      const salt = await bcrypt.genSalt(10);
      user.passwd = await bcrypt.hash(txtnewpass, salt);
      await user.save();
      return res.status(200).json({ msg: "Đổi mật khẩu thành công" });
    } catch (err) {
      if (err) {
        console.log("có vào catch nhé");
        return res.status(400).json({ msg: "Không lấy được dữ liệu" });
      }
    }
  }
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
