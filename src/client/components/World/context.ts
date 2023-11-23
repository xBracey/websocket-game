import { createContext } from "react";
import { Engine } from "../../engine";

export const WorldContext = createContext({
  world: new Engine(),
});
