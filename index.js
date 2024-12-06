const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
    const filePath = path.resolve(__dirname, 'uploads', req.file.filename);
    console.log('文件已保存到:', filePath);
    res.json({ message: '上传成功', file: filePath });
  } else {
    res.status(400).json({ message: '上传失败' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
