import { IRect } from "bump-ts";
import React, { useContext, useEffect } from "react";
import { WorldContext } from "./World/context";
import { Sprite } from "@pixi/react";
import { Texture } from "pixi.js";

interface BorderProps {
  width: number;
  height: number;
  thickness: number;
}

export const Border = ({ width, height, thickness }: BorderProps) => {
  const { world } = useContext(WorldContext);

  const topBorder: IRect = { x: 0, y: 0, w: width, h: thickness };
  const bottomBorder: IRect = {
    x: 0,
    y: height - thickness,
    w: width,
    h: thickness,
  };
  const leftBorder: IRect = { x: 0, y: 0, w: thickness, h: height };
  const rightBorder: IRect = {
    x: width - thickness,
    y: 0,
    w: thickness,
    h: height,
  };

  useEffect(() => {
    world.addBox("border-top", topBorder);
    world.addBox("border-bottom", bottomBorder);
    world.addBox("border-left", leftBorder);
    world.addBox("border-right", rightBorder);
  }, []);

  const commonBorderProps = {
    texture: Texture.WHITE,
    tint: 0x00ff00,
    anchor: 0,
  };

  return (
    <>
      <Sprite
        x={topBorder.x}
        y={topBorder.y}
        width={topBorder.w}
        height={topBorder.h}
        {...commonBorderProps}
      />
      <Sprite
        x={bottomBorder.x}
        y={bottomBorder.y}
        width={bottomBorder.w}
        height={bottomBorder.h}
        {...commonBorderProps}
      />
      <Sprite
        x={leftBorder.x}
        y={leftBorder.y}
        width={leftBorder.w}
        height={leftBorder.h}
        {...commonBorderProps}
      />
      <Sprite
        x={rightBorder.x}
        y={rightBorder.y}
        width={rightBorder.w}
        height={rightBorder.h}
        {...commonBorderProps}
      />
    </>
  );
};
