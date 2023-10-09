export const autoleaders = (data) => {
  try {
    const dataSplit = data.toString().split(",");
    const dataObj = {};
    dataObj.deviceId = dataSplit[1];
    dataObj.time = dataSplit[3];
    dataObj.isValid = dataSplit[4];
    dataObj.lat = dataSplit[5];
    dataObj.latDirection = dataSplit[6];
    dataObj.long = dataSplit[7];
    dataObj.longDirection = dataSplit[8];
    dataObj.speed = dataSplit[9];
    dataObj.direction = dataSplit[10];
    dataObj.date = dataSplit[11];
    dataObj.state = dataSplit[12];

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
      const latValue = dataObj.lat;
      const latDegrees = latValue.slice(0, 2);
      const latMinutes = latValue.slice(2, 4) / 60;
      const latMinutesDecimals = latValue.slice(4) / 60 / 10000; // Los decimales representan minutos decimales
      const latDecimal =
        parseFloat(latDegrees) + parseFloat(latMinutes) + latMinutesDecimals;

      // Formatea el resultado con 5 decimales
      const resultado = latDecimal.toFixed(5);

      return resultado;
    };

    const latitud = lat(dataObj);

    const long = (dataObj) => {
      const longitud = dataObj.long;
      const G = longitud.slice(0, 3).padStart(3, "0");
      const longMin = (longitud.slice(3, longitud.length) / 60).toFixed(5);
      const resultado = (parseFloat(G) + parseFloat(longMin))
        .toString()
        .padStart(9, "0");

      return resultado;
    };
    const longitud = long(dataObj);

    const deviceIdToPlaca = {
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
      9170669667: "FXRX57",
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
    const imei = dataObj.deviceId;
    const patente = deviceIdToPlaca[imei];
    const latMark = (dataObj) => {
      if (dataObj.latDirection === "S") {
        return "-";
      } else return "+";
    };
    const hemisferioNS = latMark(dataObj);
    const lonMark = (dataObj) => {
      if (dataObj.longDirection === "W") {
        return "-";
      } else return "+";
    };
    const hemisferioEO = lonMark(dataObj);
    const speed = () => {
      const speed = (dataObj.speed * 1.852).toFixed(0).padStart(3, "0");
      return speed;
    };
    const event = "03";

    const send = {
      placa: patente,
      latMark: hemisferioNS,
      latitud: latitud,
      longMark: hemisferioEO,
      longitud: longitud,
      time: time(),
      speed: speed(),
      course: dataObj.direction,
      event: event,
      isValid: dataObj.isValid,
    };
    const resultado = `${send.placa}${send.latMark}${send.latitud}${send.longMark}${send.longitud}${send.time}${send.speed}${send.course}${send.event}${send.isValid}`;
    console.log(resultado);
    return resultado;
  } catch (e) {
    console.error("Error", e);
  }
};
