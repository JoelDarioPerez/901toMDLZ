const raw = require("raw-socket");

// Configura el servidor para escuchar en un puerto específico
const PORT = 12345; // Puedes cambiar el puerto si lo deseas

// Crea un socket UDP crudo
const socket = raw.createSocket({
  protocol: raw.Protocol.UDP,
});

// Enlaza el socket al puerto especificado
socket.bind({ address: "0.0.0.0", port: PORT });

console.log(`Servidor UDP escuchando en el puerto ${PORT}`);

// Maneja eventos cuando se recibe un mensaje
socket.on("message", (buffer, source) => {
  console.log(`Mensaje recibido desde ${source.address}:${source.port}:`);
  console.log(buffer.toString("hex")); // Muestra los datos en formato hexadecimal
});

// Maneja errores
socket.on("error", (err) => {
  console.error(`Error en el servidor UDP: ${err.message}`);
});
