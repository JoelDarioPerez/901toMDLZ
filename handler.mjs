import { autoleaders } from "./protocolos.mjs";
/* import { AL900 } from "./protocolos.mjs";
 */
export const handler = (data) => {
  if (data.startsWith("*HQ")) {
    return autoleaders(data);
  }
};
