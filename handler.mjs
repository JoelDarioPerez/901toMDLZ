import { autoleaders } from "./protocolos.mjs";
import { AL900 } from "./protocolos.mjs";

export const handler = (data) => {
  try {
    if (Buffer.byteLength(data) === 99 || Buffer.byteLength(data) === 97) {
      return autoleaders(data);
    } else if (Buffer.byteLength(data) === 45) {
      return AL900(data);
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (e) {
    console.log(e);
    return null; // Manejo de errores
  }
};
