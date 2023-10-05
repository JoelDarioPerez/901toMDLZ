import { udpServer } from "node-netcat";
// Configurar el servidor UDP
const server = udpServer(12345); // Puerto en el que el servidor escuchará

// Manejar eventos cuando el servidor esté listo y cuando reciba datos
server.on("ready", () => {
  console.log("Servidor UDP listo para recibir datos.");
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
