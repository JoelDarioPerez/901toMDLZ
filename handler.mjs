import { autoleaders } from "./protocolos.mjs";
/* import { AL900 } from "./protocolos.mjs";
 */
export const handler = (data) => {
  try {
    if (Buffer.byteLength(data) === 99 || Buffer.byteLength(data) === 97) {
      return autoleaders(data);
    } else if (
      Buffer.byteLength(data) === 45 ||
      (Buffer.byteLength(data) !== 99 && Buffer.byteLength(data) !== 97)
    ) {
      return console.log("No se reconoce el protocolo");
    } else if (Buffer.byteLength === 12) {
      throw new Error("Handshake, no enviado");
    }
  } catch (e) {
    console.log(e);
    return null; // Manejo de errores
  }
};
