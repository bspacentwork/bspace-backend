const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bspace backend is alive 🚀");
});

server.listen(3000, () => {
  console.log("Bspace server running");
});
