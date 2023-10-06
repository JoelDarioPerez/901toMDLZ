import net from "net";
import dgram from "dgram";
const mondelez = (data) => {
  const time = () => {
    const fechaHoraActual = new Date();

    const dia = fechaHoraActual.getDate().toString().padStart(2, "0");
    const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, "0"); // Los meses se indexan desde 0, por lo que sumamos 1.
    const anio = fechaHoraActual.getFullYear().toString().slice(-2); // Obtenemos los últimos dos dígitos del año.
    const hora = fechaHoraActual.getHours().toString().padStart(2, "0");
    const minutos = fechaHoraActual.getMinutes().toString().padStart(2, "0");
    const segundos = fechaHoraActual.getSeconds().toString().padStart(2, "0");

    // Combina los componentes en el formato deseado
    const fechaHoraFormatoPersonalizado = `${dia}${mes}${anio}${hora}${minutos}${segundos}`;

    return fechaHoraFormatoPersonalizado;
  };

  const lat = (dataObj) => {
    const lat = dataObj.lat;
    const G = dataObj.lat.slice(0, 2).padStart(2, "0");
    const latMin = lat.slice(2, lat.length) / 60;
    const longitud = (parseFloat(G) + parseFloat(latMin)).toFixed(5);

    return longitud.padStart(8, "0");
  };

  const long = (dataObj) => {
    const long = dataObj.lon;
    const G = dataObj.lon.slice(0, 3).padStart(3, "0");
    long.slice(0, 3);
    const longMin = (long.slice(3, long.length) / 60).toFixed(5);
    const retsultado = (parseFloat(G) + parseFloat(longMin))
      .toString()
      .padStart(9, "0");

    return retsultado;
  };
  const deviceIdToPlaca = {
    373437510: "FXRX57",
    639699270: "HKPH96",
    8170877407: "DRZV36",
    9170478105: "HFSX88",
    9170482858: "HJYC77",
    9170482863: "DPRL96",
    9170482895: "DRXX97",
    9170668716: "HFSX87",
    9170668726: "DRXT51",
    9170668733: "HFSX89",
    9170668791: "BJCK48",
    9170669667: "DRKS19",
    9170669711: "CHWL23",
    9171036832: "HKPH96",
    9171037167: "FXRX64",
    9171037258: "GZKH94",
    9171037262: "BZXB28",
    9171037374: "BJCJ68",
    9171037419: "DPRL41",
    9171129355: "FXRX62",
    9171129425: "GKGH77",
    9171129426: "BJCJ64",
    9171129494: "HKXW99",
    9171129510: "DPRL74",
    9171129517: "YR4571",
    9171129535: "YP6897",
    8170873820: "PFB320",
  };
  const dataSplit = data.split(",");
  const imei = parseInt(dataSplit[1], 10);

  const buscarPlacaPorImei = (imei) => {
    if (imei in deviceIdToPlaca) {
      return deviceIdToPlaca[imei];
    } else {
      return "ID no encontrado";
    }
  };
  const latMark = () => {
    if (dataSplit[6] === "S") {
      return "-";
    } else return "+";
  };
  const lonMark = () => {
    if (dataSplit[8] === "W") {
      return "-";
    } else return "+";
  };

  const dataObj = {
    id: imei,
    lat: dataSplit[5],
    latMark: latMark(),
    lon: dataSplit[7],
    longMark: lonMark(),
    speed: (parseFloat(dataSplit[9]) * 1.852).toFixed(0).padStart(3, "0"),
    course: dataSplit[10].padStart(3, "0"),
    date: dataSplit[11],
    time: dataSplit[3],
    isValid: dataSplit[4],
    placa: buscarPlacaPorImei(imei),
    event: "03",
  };
  const latitud = lat(dataObj);
  const longitud = long(dataObj);
  const send = {
    placa: dataObj.placa,
    latMark: dataObj.latMark,
    latitud: latitud,
    longMark: dataObj.longMark,
    longitud: longitud,
    time: time(),
    speed: dataObj.speed,
    course: dataObj.course,
    event: dataObj.event,
    isValid: dataObj.isValid,
  };
  console.log(
    `${send.placa}${send.latMark}${send.latitud}${send.longMark}${send.longitud}${send.time}${send.speed}${send.course}${send.event}${send.isValid}`
  );
  return `${send.placa}${send.latMark}${send.latitud}${send.longMark}${send.longitud}${send.time}${send.speed}${send.course}${send.event}${send.isValid}`;
};
// Crear el servidor TCP
const tcpServer = net.createServer((tcpClient) => {
  console.log(
    `Cliente TCP conectado desde ${tcpClient.remoteAddress}:${tcpClient.remotePort}`
  );

  // Manejar datos recibidos desde el GPS Tracker
  tcpClient.on("data", (data) => {
    const modifiedData = mondelez(data.toString()); // Modificar los datos con la función 'mondelez'
    console.log(`Datos modificados: ${modifiedData}`);
    console.log(data.toString());

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
  const udpPort = "6002";
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
