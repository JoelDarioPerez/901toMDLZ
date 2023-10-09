import { autoleaders } from "./protocolos.mjs";
import { AL900 } from "./protocolos.mjs";
import * as buffer from "vinyl-buffer";

export const handler = (data) => {
  try {
    if (Buffer.byteLength(data) === 99 || Buffer.byteLength(data) === 97) {
      return autoleaders(data);
    } else if (
      Buffer.byteLength(data) === 45 ||
      (Buffer.byteLength(data) !== 99 && Buffer.byteLength(data) !== 97)
    ) {
      return AL900(data);
    } else if (Buffer.byteLength === 12) {
      throw new Error("Handshake, no enviado");
    }
  } catch (e) {
    console.log(e);
    return null; // Manejo de errores
  }
};
