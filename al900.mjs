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
