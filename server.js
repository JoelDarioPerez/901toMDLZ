const net = require("net");

// Escuchamos paquetes UDP en el puerto 6002
const server = net.createServer(function (socket) {
  // Obtenemos la IP del cliente
  const clientIP = socket.remoteAddress;

  // Mostramos la IP en consola
  console.log("Envía los paquetes a la IP: %s", clientIP);

  // Enviamos un mensaje de respuesta al cliente
  socket.write("IP recibida");
  socket.end();
});

server.listen(6002);

console.log("Escuchando paquetes UDP en el puerto 6002...");
