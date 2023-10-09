import { autoleaders } from "./protocolos.mjs";
/* import { AL900 } from "./protocolos.mjs";
 */
export const handler = (data) => {
  try {
    if (Buffer.byteLength(data) === 99 || Buffer.byteLength(data) === 97) {
      return autoleaders(data);
    } else {
      // Manejar otro caso si es necesario
      console.log("Tamaño de paquete no válido");
      return null; // Otra acción o valor de retorno si es necesario
    }
  } catch (e) {
    console.log(e);
    return null; // Manejo de errores
  }
};
