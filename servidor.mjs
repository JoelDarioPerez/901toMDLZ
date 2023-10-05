import netcat from "node-netcat";

const port = 5000;
const host = "0.0.0.0";

// Configurar el servidor UDP
const server = netcat.udpServer(port, host);

server.on("data", function (msg, client, protocol) {
  console.log("rx: " + msg + ", from " + client);
});

server.on("ready", function () {
  console.log("Servidor UDP listo para recibir datos.");
});

server.once("error", function (err) {
  console.log(err);
});

server.once("close", function () {
  console.log("Servidor UDP cerrado.");
});

// Iniciar el servidor UDP
server.bind();

setTimeout(function () {
  server.close();
}, 30000);
