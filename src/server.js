const express = require("express");
const path = require("path");
const cors = require("cors");
const downloadVideo = require("./helpers/downloadVideo");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(
  cors({
    origin: ["http://localhost:4000"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", async (req, res) => {
  const { videoUrl } = req.body;
  if (!videoUrl) return res.send(404);

  const videoStream = await downloadVideo(videoUrl);
  console.log();
  res.header("Content-Disposition", `attachment; filename="${Date.now()}.mp4"`);
  videoStream.pipe(res);
});

app.listen(4000, () => {
  console.log("app started on http://localhost:4000");
});
