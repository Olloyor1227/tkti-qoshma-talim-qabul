const express = require("express");
const router = express.Router();
// const upload = require("../config/multer").array("file", 20);
const upload = require("../config/multer").single("file");
const middleware = require("../middleware");
const ApplicationController = require("../constroller/application");

router.post(
  "/add",
  (req, res, next) => {
    upload(req, res, function (err) {
      if (err || !req.file) {
        res
          .status(404)
          .json({
            status: 404,
            success: false,
            message: `Yangilik qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring ${err}`,
          });
        return;
      }
      next();
    });
  },
  ApplicationController.Add
);
router.post("/login", ApplicationController.Login);
router.get(
  "/",
  middleware.checkContentType,
  middleware.checkToken,
  ApplicationController.Get
);
router.get(
  "/all-media",
  middleware.checkContentType,
  middleware.checkToken,
  ApplicationController.GetAll
);
router.get(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  ApplicationController.GetById
);
router.put(
  "/:id",
  middleware.checkParamsId,
  middleware.checkToken,
  (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        res
          .status(404)
          .json({
            status: 404,
            success: false,
            message: `Media qo'shish uchun 'file' keyidan foydalanib 1ta rasm yuboring`,
          });
        return;
      }
      next();
    });
  },
  ApplicationController.Edit
);
router.delete(
  "/:id",
  middleware.checkParamsId,
  middleware.checkContentType,
  middleware.checkToken,
  ApplicationController.Delete
);
router.get("/down/:file", ApplicationController.Download);

module.exports = router;
