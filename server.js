import net from "net";
import dgram from "dgram";
import dotenv from "dotenv";
import mondelez from "./mondelez.mjs";

dotenv.config();

const server = net.createServer((client) => {
  console.log(
    `Cliente conectado desde ${client.remoteAddress}:${client.remotePort}`
  );

  client.on("data", (data) => {
    const modifiedData = mondelez(data.toString()); // Aplica la función 'mondelez' a los datos recibidos
    console.log(`Datos modificados: ${modifiedData}`);

    // Envia los datos modificados al destino UDP
    const udpClient = dgram.createSocket("udp4");
    udpClient.send(
      modifiedData,
      0,
      modifiedData.length,
      UDP_PORT,
      UDP_HOST,
      (err) => {
        if (err) {
          console.error("Error al enviar datos UDP:", err);
        } else {
          console.log("Datos enviados con éxito al destino UDP");
        }
        udpClient.close();
      }
    );

    // Reenvía los datos al cliente TCP
    client.write(modifiedData);

    // Pipe para enviar los datos al siguiente servidor
    const nextServer = net.createConnection({
      host: SINOTRACKING_HOST,
      port: SINOTRACKING_PORT,
    });

    client.pipe(nextServer);
    nextServer.pipe(client);
  });

  client.on("end", () => {
    console.log("Cliente desconectado");
  });

  client.on("error", (err) => {
    console.error("Error en la conexión con el cliente:", err);
  });
});

server.on("error", (err) => {
  console.error("Error en el servidor TCP:", err);
});

server.listen(TCP_PORT, () => {
  console.log(`Servidor TCP escuchando en el puerto ${TCP_PORT}`);
});
