const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'videos')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'video.html'));
});

app.post('/upload', upload.single('video-file'), (req, res) => {
  const inputFilePath = path.join(__dirname, 'uploads', req.file.filename);
  const outputDir = path.join(__dirname, 'videos', 'output');
  const outputFilePath = path.join(outputDir, 'index.m3u8');

  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
  }

  exec(`ffmpeg -i ${inputFilePath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename ${outputDir}/segments%03d.ts -start_number 0 ${outputFilePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during ffmpeg execution: ${error}`);
      return res.status(500).send('Error during conversion');
    }
    res.json({ videoUrl: `http://localhost:8000/output/index.m3u8` });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
