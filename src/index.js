const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// 使用 body-parser 解析 POST 请求中的 JSON 数据
app.use(bodyParser.json({ limit: '50mb' }));

// 允许跨域访问
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  next();
});

// 保存图像
app.post('/saveImage', (req, res) => {
  console.log("Received image data");

  const image = req.body.imegse;

  if (!image || !/^data:image\/(jpeg|png|gif);base64,/.test(image)) {
    console.log("Invalid input: ", image);
    return res.json({ status: 'error', message: 'Invalid input.' });
  }

  const imageName = `${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}_${Math.floor(Math.random() * 8999 + 1111)}.png`;

  // 移除 Base64 前缀
  const base64Image = image.split(',')[1];

  const ip = getIp(req);
  const dirPath = path.join(__dirname, sanitizeIp(ip), new Date().toISOString().split('T')[0]);

  // 创建目录
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("Created directory: ", dirPath);
  }

  const imagePath = path.join(dirPath, imageName);

  // 保存图像
  fs.writeFile(imagePath, Buffer.from(base64Image, 'base64'), (err) => {
    if (err) {
      console.log("Failed to save image: ", err);
      return res.json({ status: 'error', message: 'Failed to save image.' });
    }

    console.log("Image saved successfully at: ", imagePath);
    res.json({ status: 'success', path: imagePath });
  });
});

// 获取用户 IP 地址
function getIp(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
}

// 清理 IP 地址，防止非法字符
function sanitizeIp(ip) {
  return ip.replace(/[^a-zA-Z0-9_\-]/g, '');
}

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
