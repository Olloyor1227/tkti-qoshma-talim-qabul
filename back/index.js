const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json({ limit: "5mb" }));
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("success ", process.env.MONGODB_URI);
  })
  .catch((err) => {
    console.log("error");
  });

app.use("/api/auth", require("./router/adminRoutes"));
app.use("/api/filter", require("./router/filterRoutes"));
app.use("/api/user", require("./router/userroutes"));
app.use("/api/news", require("./router/YangilikRoutes"));
app.use("/api/banner", require("./constroller/banner/route"));
app.use("/api/application", require("./router/application"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`${PORT} server running now`);
});
