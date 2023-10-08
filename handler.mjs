import { autoleaders } from "./protocolos.mjs";
import { AL900 } from "./protocolos.mjs";

export const handler = (data) => {
  if (data.startsWith("2929") && data.length === 90) {
    return AL900(data);
  } else data.startsWith("*HQ") && data.length === 80;
  {
    return autoleaders(data);
  }
};
