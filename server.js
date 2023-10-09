import net from "net";
import dgram from "dgram";
/* import { AL900 } from "./protocolos.mjs";
 */ import { config as dotenv } from "dotenv";
import { handler } from "./handler.mjs";
import { autoleaders } from "./protocolos.mjs";

dotenv();

// Crear el servidor TCP
const tcpServer = net.createServer((tcpClient) => {
  console.log(
    `Cliente TCP conectado desde ${tcpClient.remoteAddress}:${tcpClient.remotePort}`
  );

  // Crear una conexión TCP hacia SINOTRACKING_HOST y SINOTRACKING_PORT
  const sinotrackingClientAL900 = net.createConnection({
    host: process.env.SINOTRACKING_HOST,
    port: parseInt(process.env.SINOTRACKINGAL900_PORT),
  });
  const sinotrackingClient = net.createConnection({
    host: process.env.SINOTRACKING_HOST,
    port: parseInt(process.env.SINOTRACKING_PORT),
  });

  // Manejar datos recibidos desde el GPS Tracker
  tcpClient.on("data", (data) => {
    const modifiedData = autoleaders(data.toString()); // Modificar los datos con la función 'mondelez'
    console.log(`Datos modificados: ${modifiedData}`);
    sinotrackingClient(data);
    // Enviar los datos modificados a través de UDP
    try {
      sendToUDP(modifiedData);
    } catch (err) {
      console.log(err);
    }

    //Reenvio a sinotracking
    if (Buffer.byteLength(data) === 99 || Buffer.byteLength(data) === 97) {
      sinotrackingClient.write(data);
    } else {
      sinotrackingClientAL900.write(data);
      console.log("Datos AL900", data.toString("hex"));
      console.log(Buffer.byteLength(data));
    }
  });

  // Manejar la desconexión del cliente TCP
  tcpClient.on("end", () => {
    console.log("Cliente TCP desconectado");
    // Cerrar la conexión con SINOTRACKING_HOST
    sinotrackingClient.end();
  });

  // Manejar errores de conexión TCP
  tcpClient.on("error", (err) => {
    console.error("Error en la conexión con el cliente TCP:", err);
  });
});

// Configurar el servidor TCP para escuchar en el puerto 6000
tcpServer.listen(process.env.TCP_PORT, () => {
  console.log("Servidor TCP escuchando en el puerto 6000");
});

// Función para enviar datos al servidor UDP
function sendToUDP(modifiedData) {
  const udpClient = dgram.createSocket("udp4");
  const udpPort = process.env.UDP_PORT;
  const udpHost = process.env.UDP_HOST;

  udpClient.send(
    modifiedData,
    0,
    modifiedData.length,
    udpPort,
    udpHost,
    (err) => {
      if (err) {
        console.error("Error al enviar datos UDP:", err);
      } else {
        console.log("Datos enviados con éxito al servidor UDP");
      }
      udpClient.close();
    }
  );
}
