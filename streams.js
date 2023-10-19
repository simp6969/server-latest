import fs from "fs";

const readStream = fs.createReadStream("./server.txt", "utf-8");
const writeStream = fs.createWriteStream("./server.txt");

readStream.on("data", function (chunk) {
  console.log("received data");
  console.log(chunk);
  writeStream.write(chunk);
});
