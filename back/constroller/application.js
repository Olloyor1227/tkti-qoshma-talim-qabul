const Application_data = require("../modules/application");
const validate = require("../middleware/validate");
const removeMedia = require("../config/fs");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const setToken = (payload) =>
  jwt.sign(payload, "MUSAFFO_SKY", {
    expiresIn: "48h", // token 2kundan keyin eskiradi, token eskirgandan keyin admin pashti hech nima qilomeydi yangilab login qivomagancha
  });

class ApplicationController {
  async Add(req, res) {
    try {
      const { error, value } = validate.postApplicaton.validate({
        ...req.body,
      });
      if (error) {
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }

      // User phone va passport_number bo'yicha qidirilyapti
      const user = await Application_data.findOne({
        phone: value.phone,
        passport_number: value.passport_number,
      }).select(["tel", "passport_number", "name"]);

      if (user) {
        console.log(user);
        res.status(400).json({
          success: false,
          status: 400,
          message: `${user?.passport_number} passport seriyali foydalanuvchi tizimda mavjud`,
        });
        return;
      }

      value.photo = `uploads/${req.file.filename}`;

      const application = new Application_data(value);
      await application.save();

      res.status(200).json({
        status: 200,
        success: true,
        message: `Ariza muvaffaqiyatli saqlandi, shaxsiy kabinetingizga o'tib to'lov qiling va uni faollashtiring`,
        data: application,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async Login(req, res) {
    try {
      const { error, value } = validate.login.validate({ ...req.body });

      // Validatsiyadan o'tmadi
      if (error) {
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }

      // User phone va passport_number bo'yicha qidirilyapti
      const user = await Application_data.findOne({
        phone: value.phone,
        passport_number: value.passport_number,
      }).select(["tel", "passport_number", "name", "_id"]);

      if (!user) {
        res
          .status(404)
          .json({ success: false, data: "Foydalanuvchi topilmadi" });
      } else {
        res.status(200).json({
          success: true,
          text: "Xush kelibsiz",
          data: user,
          token: setToken({ id: user._id }),
        });
      }
    } catch (e) {
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
  async Edit(req, res) {
    try {
      const { error, value } = validate.postApplicaton.validate({
        ...req.body,
      });
      if (error) {
        if (req.file) {
          removeMedia(req.file.filename);
        }
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }

      if (req.file) {
        value.file = `uploads/${req.file.filename}`;
      }

      const updated = await Application_data.findByIdAndUpdate(
        req.params.id,
        { ...value },
        { new: true }
      );

      if (!updated) {
        res.status(404).json({
          status: 404,
          message: "berilgan id bo`yicha data topilmadi",
          success: false,
        });
        return;
      }

      res.status(200).json({
        status: 200,
        success: true,
        message: `media yangilandi`,
        data: updated,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }

  async Pay(req, res) {
    try {
      const { error, value } = validate.postApplicaton.validate({
        ...req.body,
      });

      if (error) {
        if (req.file) {
          removeMedia(req.file.filename);
        }
        res
          .status(403)
          .json({ status: 403, message: String(error["details"][0].message) });
        return;
      }

      if (req.file) {
        value.paid_file = `uploads/${req.file.filename}`;
      }
      
      const updated = await Application_data.findByIdAndUpdate(
        req.params.id,
        { ...value },
        { new: true }
      );

      if (!updated) {
        res.status(404).json({
          status: 404,
          message: "berilgan id bo`yicha data topilmadi",
          success: false,
        });
        return;
      }
      
      res.status(200).json({
        status: 200,
        success: true,
        message: `Muvaffaqiyatli yakunlandi. Arizangiz faol`,
        data: updated,
      });

    } catch (e) {
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
  async Get(_, res) {
    try {
      const Media = await Application_data.find();
      console.log(Media);
      res.status(200).json({
        status: 200,
        success: true,
        message: `Yaxshi uka`,
        data: Media,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
  async GetAll(_, res) {
    try {
      const Media = fs.readdirSync(path.join(__dirname, "..", "uploads"));

      res.status(200).json({
        status: 200,
        success: true,
        message: `Yaxshi uka`,
        data: Media,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
  async GetById(req, res) {
    try {
      const Media = await Application_data.findOne({ _id: req.params.id });

      if (!Media) {
        res
          .status(404)
          .json({ status: 404, message: "Media topilmadi", success: false });
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        message: `Yaxshi uka`,
        data: Media,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
  async Delete(req, res) {
    try {
      const Media = await Application_data.findByIdAndDelete(req.params.id);
      if (!Media) {
        res.status(404).json({ status: 404, message: "Media topilmadi :(" });
        return;
      }

      res.status(200).json({
        status: 200,
        success: true,
        message: `Yaxshi  delet qilindi`,
        data: Media,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
  async Download(req, res) {
    try {
      const { file } = req.params;

      const foundedFile = fs.existsSync(
        path.join(__dirname, "..", "uploads", file)
      );

      if (!foundedFile) {
        res.status(404).json({
          status: 404,
          message: "Yuklab olinishi kerak bo`lgan fayl bazada topilmadi",
          success: false,
        });
        return;
      }

      res.download(path.join(__dirname, "..", "uploads", file));
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: 500, message: "invalid request", success: false });
    }
  }
}

module.exports = new ApplicationController();
