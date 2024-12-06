const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// 配置存储路径
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 保存到 "uploads" 目录
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;
    cb(null, uniqueName); // 确保文件名唯一
  },
});

const upload = multer({ storage });

// 接收照片的接口
app.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("未上传文件");
  }
  console.log("收到照片：", req.file.path);

  // 可通过 WebSocket 或其他方式通知
  res.json({ success: true, filePath: req.file.path });
});

// 静态服务（可选）
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 启动服务
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务已启动：http://localhost:${PORT}`);
});
