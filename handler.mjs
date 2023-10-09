import { autoleaders } from "./protocolos.mjs";
import { AL900 } from "./protocolos.mjs";

export const handler = (data) => {
  try {
    if (Buffer.byteLength(data) === 99 || Buffer.byteLength(data) === 97) {
      return autoleaders(data);
    } else Buffer.byteLength(data) === 45;
    return AL900(data);
  } catch (e) {
    console.log(e);
    return null; // Manejo de errores
  }
};
