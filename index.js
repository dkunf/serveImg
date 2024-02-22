// npm init
// npm i express
// add hidden file .gitIgnore with contents:
//        /node_modules
//to keep node_modules not pushed to gitHub
// create files folder
//add to folder files which you want to serve

const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3232;

app.get("/", (req, res) => {
  const dirContents = [];
  fs.readdir("./files", (err, files) => {
    let htmlArr = files
      .map((f) => `<span><a href=${f} target='_blank'>${f}</a></span><br/>`)
      .join(" ");
    res.send(htmlArr);
  });

  console.log("got request");
  // res.send("images are served on \n http://localhost:3232/[image-name]");
});

app.get("/:name", (req, res) => {
  const imgFileName = req.params.name;
  console.log(imgFileName);
  const pathToImage = path.join(__dirname, "files", imgFileName);
  console.log(pathToImage);

  fs.readFile(pathToImage, (err, data) => {
    //data is Buffer type
    //don't forget err argument first
    console.log("sending data");
    res.send(data);
  });
});

// app.use(express.static(path.join(__dirname, "files")));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
