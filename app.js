const http = require("http");
const port = 8080;

const server = http.createServer(function (req, res) {});

server.listen(port, function (error) {
  if (error) {
    console.log("Something went wrong! Error", error);
  } else {
    console.log("Server is listening on port " + port);
  }
});
