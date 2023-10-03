import net from "net";
import dgram from "dgram";
import dotenv from "dotenv";
import { mondelez } from "./mondelez.mjs";

dotenv.config();
const modifiedPackage = mondelez(data);
// Crear el servidor TCP una vez
const server = net.createServer((client) => {
  console.log(
    `Cliente conectado desde ${client.remoteAddress}:${client.remotePort}`
  );

  client.on("data", (data) => {
    const modifiedData = mondelez(data.toString()); // Aplica la función 'mondelez' a los datos recibidos
    console.log(`Datos modificados: ${modifiedData}`);
    console.log(data.toString());

    // Envia los datos modificados al destino UDP
    sendToUDP(modifiedData);

    // Pipe para enviar los datos al siguiente servidor
    const nextServer = net.createConnection({
      host: process.env.SINOTRACKING_HOST,
      port: process.env.SINOTRACKING_PORT,
    });

    client.pipe(nextServer);
    nextServer.pipe(client);
  });

  client.on("end", () => {
    console.log("Cliente desconectado");
  });

  // Limitar el número de oyentes del evento 'end' a 1
  client.on(
    "end",
    () => {
      console.log("Cliente desconectado");
    },
    { maxListeners: 1 }
  );

  client.on("error", (err) => {
    console.error("Error en la conexión con el cliente:", err);
  });
});

server.on("error", (err) => {
  console.error("Error en el servidor TCP:", err);
});

server.listen(process.env.TCP_PORT, () => {
  console.log(`Servidor TCP escuchando en el puerto ${process.env.TCP_PORT}`);
});

// Función para enviar datos al destino UDP
function sendToUDP(modifiedData) {
  const udpClient = dgram.createSocket("udp4");
  udpClient.send(
    modifiedPackage,
    0,
    modifiedPackage.length,
    process.env.UDP_PORT,
    process.env.UDP_HOST,
    (err) => {
      if (err) {
        console.error("Error al enviar datos UDP:", err);
      } else {
        console.log("Datos enviados con éxito al destino UDP");
      }
      udpClient.close();
    }
  );
}
