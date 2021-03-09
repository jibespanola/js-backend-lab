const http2 = require("http2");
// File system to read certificates
const fs = require("fs");

// Use SecureServer instead of regular Server
const server = http2.createSecureServer({
  // private key
  key: fs.readFileSync("localhost-private.pem"),
  // self-provided certificate
  cert: fs.readFileSync("localhost-cert.pem"),
});

server.on("stream", (stream, headers) => {
  console.log(stream.id);
  // Headers are sent first
  stream.respond({
    "content-type": "application/json",
    status: 200,
  });

  stream.end(
    JSON.stringify({
      user: "User",
      id: 823,
    })
  );
});

server.listen(8443);
console.log("listening on port 8443");
