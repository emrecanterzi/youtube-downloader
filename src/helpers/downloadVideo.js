const fs = require("fs");
const ytdl = require("ytdl-core");

const downloadVideo = (videoUrl) => {
  const video = ytdl(videoUrl, {
    quality: 18,
    audio: true,
  });

  return video;
};

module.exports = downloadVideo;
