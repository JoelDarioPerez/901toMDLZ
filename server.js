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

const server = net.createServer((client) => {
  console.log(
    `Cliente conectado desde ${client.remoteAddress}:${client.remotePort}`
  );

  client.on("data", (data) => {
    // Asegúrate de que 'data' contenga datos válidos antes de llamar a 'mondelez'
    if (data && data.toString().trim() !== "") {
      const modifiedData = mondelez(data.toString()); // Aplica la función 'mondelez' a los datos recibidos
      console.log(`Datos modificados: ${modifiedData}`);
      console.log(data.toString());

      // Envia los datos modificados al destino UDP
      sendToUDP(modifiedData);
    } else {
      console.log("Datos vacíos o no válidos recibidos.");
    }
  });

  client.on("end", () => {
    console.log("Cliente desconectado");
  });

  // Limitar el número de oyentes del evento 'end' a 1
  client.setMaxListeners(1);

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
function sendToUDP(modifiedPackage) {
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
