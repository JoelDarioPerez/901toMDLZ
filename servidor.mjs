import { udpServer } from "node-netcat";

const port = "5000";
const host = "0.0.0.0";
var server = udpServer(port, host);

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
