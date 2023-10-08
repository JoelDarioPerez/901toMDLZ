import { autoleaders } from "./protocolos.mjs";
import { AL900 } from "./protocolos.mjs";

export const handler = (data) => {
  if (data.toString("hex").startsWith("2929") && data.length === 90) {
    return AL900(data);
  } else data.startsWith("*HQ");
  {
    return autoleaders(data);
  }
};
