const mondelez = (data) => {
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
  };
  const dataSplit = data.split(",");
  const imei = parseInt(dataSplit[1], 10);

  const decLat = () => {
    const latitudEnFormato = dataSplit[5].slice(0, 9);
    const grados = parseInt(latitudEnFormato.slice(0, 2), 10)
      .toString()
      .padStart(2, "0");
    const minutos = parseFloat(latitudEnFormato.slice(2)) / 10000;
    return `${grados.padStart(2, "0")}${minutos.toFixed(5).substring(1)}`;
  };

  const decLong = () => {
    const longitudEnFormato = dataSplit[7].slice(0, 10);
    const grados = parseInt(longitudEnFormato.slice(0, 3), 10)
      .toString()
      .padStart(3, "0");
    const minutos = parseFloat(longitudEnFormato.slice(3)) / 10000;
    return `${grados}${minutos.toFixed(5).substring(1)}`;
  };

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
    lat: decLat(),
    latMark: latMark(),
    lon: decLong(),
    longMark: lonMark(),
    speed: (parseFloat(dataSplit[9]) * 1.852).toFixed(0).padStart(3, "0"),
    course: dataSplit[10].padStart(3, "0"),
    date: dataSplit[11],
    time: dataSplit[3],
    isValid: dataSplit[4],
    placa: buscarPlacaPorImei(imei),
    event: "03",
  };
  return `${dataObj.placa}${dataObj.latMark}${dataObj.lat}${dataObj.longMark}${dataObj.lon}${dataObj.date}${dataObj.time}${dataObj.speed}${dataObj.course}${dataObj.event}${dataObj.isValid}`;
};

export default mondelez;
