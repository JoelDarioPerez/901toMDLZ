import netcat from "node-netcat";

// Configurar el servidor UDP
const port = "6002";
const server = netcat.udpServer(port); // Puerto en el que el servidor escuchará

// Manejar eventos cuando el servidor esté listo y cuando reciba datos
server.on("ready", () => {
  console.log("Servidor UDP listo para recibir datos en el puerto" + port);
});

server.on("data", (msg, clientInfo) => {
  console.log(
    `Mensaje recibido desde ${clientInfo.address}:${clientInfo.port}: ${msg}`
  );
});

// Manejar eventos de error y cierre del servidor
server.on("error", (err) => {
  console.error("Error en el servidor UDP:", err);
});

server.on("close", () => {
  console.log("Servidor UDP cerrado.");
});

// Iniciar el servidor UDP
server.bind();
