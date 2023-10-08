export const autoleaders = (data) => {
  console.log(data.toString);
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

  console.log(dataObj);
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
    console.log(latValue);
    const G = latValue.padStart(2, "0");
    const latMin = latValue.slice(2, latValue.length) / 60;
    const longitud = (parseFloat(G) + parseFloat(latMin)).toFixed(5);

    return longitud.padStart(8, "0");
  };
  const latitud = lat(dataObj);

  const long = (dataObj) => {
    const longitud = dataObj.long;
    const G = longitud.slice(0, 3).padStart(3, "0");
    const longMin = (longitud.slice(3, longitud.length) / 60).toFixed(5);
    const resultado = (parseFloat(G) + parseFloat(longMin))
      .toString()
      .padStart(8, "0");

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
  const imei = dataObj.id;

  const buscarPlacaPorImei = (imei) => {
    if (imei in deviceIdToPlaca) {
      return deviceIdToPlaca[imei];
    } else {
      return "ID no encontrado";
    }
  };
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
  const speed = dataObj
    .speed(parseFloat(dataSplit[9]) * 1.852)
    .toFixed(0)
    .padStart(3, "0");
  const event = "03";
  /*   dataObj.id = imei;
  dataObj.lat = dataSplit[5];
  dataObj.latMark = latMark(data);
  dataObj.lon = dataSplit[7];
  dataObj.longMark = lonMark(data);
  dataObj.speed = 
  dataObj.course = parseFloat(dataSplit[10]).toString().padStart(3, "0");
  dataObj.date = dataSplit[11];
  dataObj.time = dataSplit[3];
  dataObj.isValid = dataSplit[4];
  dataObj.placa = buscarPlacaPorImei(imei);
  dataObj.event = "03"; */
  const placa = buscarPlacaPorImei(dataObj);
  const send = {
    placa: placa,
    latMark: hemisferioNS,
    latitud: latitud,
    longMark: hemisferioEO,
    longitud: longitud,
    time: time(),
    speed: speed,
    course: direction,
    event: event,
    isValid: dataObj.isValid,
  };
  const resultado = `${send.placa}${send.latMark}${send.latitud}${send.longMark}${send.longitud}${send.time}${send.speed}${send.course}${send.event}${send.isValid}`;
  console.log(resultado);
  return resultado;
};

export const AL900 = (data) => {
  const patente = (obj) => {
    if (obj.id === "46127476") {
      return "AA500HD";
    } else if (obj.id === "46344216") {
      return "FXRX57";
    } else return obj.id;
    // Agrega más condiciones aquí si es necesario
  };

  const latitud = (data) => {
    const Latgrados = data.substring(31, 33);
    const latMin = data.substring(33, 35);
    const latMindec = data.substring(35, 38) / 1000;
    const resultado = (
      parseFloat(Latgrados) +
      (parseFloat(latMin) + parseFloat(latMindec)) / 60
    ).toFixed(5);
    return resultado;
  };

  const longitud = (data) => {
    const longG = data.substring(39, 41);
    const longMin = data.substring(41, 43);
    const longMindec = data.substring(43, 46) / 1000;
    const resultado = (
      parseFloat(longG) +
      (parseFloat(longMin) + parseFloat(longMindec)) / 60
    ).toFixed(5);
    return resultado.toString().padStart(9, "0");
  };

  const googleLink = (obj) => {
    const maps = `https://www.google.com/maps/place/-${obj.latitud},-${obj.longitud}`;
    console.log(maps);
    return maps;
  };

  const yy = data.substring(18, 20);
  const mm = data.substring(20, 22);
  const dd = data.substring(22, 24);
  const hh = data.substring(24, 26);
  const mi = data.substring(26, 28);
  const ss = data.substring(28, 30);
  const horaUTC = new Date(Date.UTC(yy, mm - 1, dd, hh, mi, ss));
  horaUTC.setUTCHours(horaUTC.getUTCHours());

  const isValid = () => {
    const isValid = data.substring(54, 56);
    if (isValid === "ff") {
      return "A";
    } else if (isValid === "7f") {
      return "V";
    }
    // Agrega más condiciones si es necesario
  };

  const obj = {};
  obj.dia = horaUTC.getDate().toString().padStart(2, "0");
  obj.mes = (horaUTC.getMonth() + 1).toString().padStart(2, "0");
  obj.anio = horaUTC.getFullYear().toString().slice(-2);
  obj.hora = horaUTC.getHours().toString().padStart(2, "0");
  obj.min = horaUTC.getMinutes().toString().padStart(2, "0");
  obj.seg = horaUTC.getSeconds().toString().padStart(2, "0");
  obj.id = data.substring(10, 18);
  obj.latDirection = data.substring(30, 31);
  obj.latitud = latitud(data);
  obj.longDirection = data.substring(40, 41);
  obj.longitud = longitud(data);
  obj.speed = data.substring(47, 50);
  obj.course = data.substring(51, 54);
  obj.gps = isValid(data);
  obj.fuel = data.substring(56, 62);
  obj.state = data.substring(62, 70);
  obj.otherState = data.substring(70, data.length);
  obj.googleLink = googleLink(obj);
  obj.event = "03";

  const resultado = `${patente(obj)}-${obj.latitud}-${obj.longitud}${obj.dia}${
    obj.mes
  }${obj.anio}${obj.hora}${obj.min}${obj.seg}${obj.speed}${obj.course}${
    obj.event
  }${obj.gps}`;

  console.log(resultado);
  return resultado;
};
