var NetcatUdpServer = require("node-netcat").udpServer;
var server = NetcatUdpServer(5000, "0.0.0.0");

server.on("data", function (msg, client, protocol) {
  console.log("rx: " + msg + ", from " + client);
});

server.on("ready", function () {
  console.log("ready");
});

server.once("error", function (err) {
  console.log(err);
});

server.once("close", function () {
  console.log("close");
});

server.bind();

setTimeout(function () {
  server.close();
}, 30000);
