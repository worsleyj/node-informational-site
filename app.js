const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 8080;

const server = http.createServer(function (req, res) {
  console.log(req.url);

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
      //   res.write(data);
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
