import getRandomFox from "random-fox-img";
import getRandomCat from "random-cat-img";
import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

let response = "";
let response2 = "";
getRandomFox().then((data) => (response = data.message));
getRandomCat().then((data) => (response2 = data.message));

const users = [
  { name: "bat", age: 69 },
  { name: "bold", age: 14 },
  { name: "hulgaic", age: 10 },
];

//backend

app.get("/user/:name", function (req, res) {
  res.status(200);
  res.setHeader("Access-Control-Allow-Origin", "*");
  let { name } = req.params;
  const newArr = users.filter((element) => element.name === name);
  res.json(newArr[0]);
});
app.get("/cat", function (req, res) {
  res.status(200);
  res.setHeader("Access-Control-Allow-Origin", "*");
  const ReadStream = fs.createReadStream("./server.json", "utf-8");
  ReadStream.on("data", (chunk) => {
    res.send(chunk);
  });
});
app.get("/", function (req, res) {
  res.status(200);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ image1: response, image2: response2, method: req.method });
});

app.post("/", function (req, res) {
  res.status(201);
  res.setHeader("Access-Control-Allow-Origin", "*");
  users.push(req.body);
  res.json(users);
  const writeStream = fs.createWriteStream("./server.json");
  writeStream.write(JSON.stringify(users));
  writeStream.end();
});
app.put("/", function (req, res) {
  res.status(201);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ image1: response, image2: response2, method: req.method });
});
app.delete("/", function (req, res) {
  res.status(269);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ image1: response, image2: response2, method: req.method });
});

app.listen(8080);
