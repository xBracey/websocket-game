import React, { ReactNode } from "react";
import { Stage } from "@pixi/react";
import { WorldContext } from "./context";
import { Engine } from "../../engine";

interface IWorld {
  width: number;
  height: number;
  children: ReactNode;
  addPoint: () => void;
}

const World = ({ width, height, children, addPoint }: IWorld) => {
  return (
    <Stage width={width} height={height}>
      <WorldContext.Provider
        value={{ world: new Engine(width, height, addPoint) }}
      >
        {children}
      </WorldContext.Provider>
    </Stage>
  );
};

export default World;
