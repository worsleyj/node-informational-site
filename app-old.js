require("dotenv").config();
const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 8080;

if (process.env.NODE_ENV === "prod") {
  console.log("production!");
  console.log(process.env.VIDEO_URL);
}

const server = http.createServer(function (req, res) {
  const q = url.parse(req.url);
  let filename = "";
  if (q.pathname === "/") {
    filename = "./index.html";
  } else {
    filename = "." + q.pathname;
  }

  fs.readFile(filename, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.end(
        fs.readFileSync("404.html", "utf-8", (err, data) => {
          if (err) throw err;
          return data;
        })
      );
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(port, function (error) {
  if (error) {
    console.log("Something went wrong! Error", error);
  } else {
    console.log("Server is listening on port " + port);
  }
});
