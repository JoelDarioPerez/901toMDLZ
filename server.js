import net from "net";
import dgram from "dgram";

// Crear el servidor TCP
const tcpServer = net.createServer((tcpClient) => {
  console.log(
    `Cliente TCP conectado desde ${tcpClient.remoteAddress}:${tcpClient.remotePort}`
  );

  // Manejar datos recibidos desde el GPS Tracker
  tcpClient.on("data", (data) => {
    const modifiedData = mondelez(data.toString()); // Modificar los datos con la función 'mondelez'
    console.log(`Datos modificados: ${modifiedData}`);

    // Enviar los datos modificados a través de UDP
    sendToUDP(modifiedData);
  });

  // Manejar la desconexión del cliente TCP
  tcpClient.on("end", () => {
    console.log("Cliente TCP desconectado");
  });

  // Manejar errores de conexión TCP
  tcpClient.on("error", (err) => {
    console.error("Error en la conexión con el cliente TCP:", err);
  });
});

// Configurar el servidor TCP para escuchar en el puerto 6000
tcpServer.listen(6000, () => {
  console.log("Servidor TCP escuchando en el puerto 6000");
});

// Función para enviar datos al servidor UDP
function sendToUDP(modifiedData) {
  const udpClient = dgram.createSocket("udp4");
  const udpPort = 6002;
  const udpHost = "200.89.128.108";

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

// Función 'mondelez' para modificar los datos del GPS Tracker
function mondelez(data) {
  // Implementa tu lógica de modificación de datos aquí
  // Por ejemplo, puedes procesar 'data' y devolver los datos modificados
  // Debe ser una función que tome 'data' como parámetro y devuelva los datos modificados.
  // Aquí solo se muestra como un marcador de posición, debes implementarla según tus necesidades.

  return data;
}
