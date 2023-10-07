const data =
  "29298e001b46914885230915161157833101888682645200100210ffff000002fc00";

const autoleaders = (data) => {
  const obj = {};
  obj.header = data.substring(0, 4);
  obj.command = data.substring(4, 6);
  obj.largo = data.substring(6, 10);
  obj.id = data.substring(10, 18);
  obj.time = data.substring(18, 24);
  obj.date = data.substring(24, 30);
  obj.latDirection = data.substring(30, 31);
  obj.grados = data.substring(31, 38);
  obj.longDirection = data.substring(38, 39);
  obj.GradosLongitud = data.substring(39, 46);
  obj.speed = data.substring(46, 50);
  obj.course = data.substring(50, 54);
  obj.gps = data.substring(54, 56);
  obj.fuel = data.substring(56, 62);
  obj.state = data.substring(62, 70);
  console.log(obj);
};

autoleaders(data);
