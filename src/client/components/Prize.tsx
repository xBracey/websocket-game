import React, { useContext, useMemo } from "react";
import { Texture } from "pixi.js";
import PhysicsObject from "./PhysicsObject";
import { WorldContext } from "./World/context";

export const Prize = () => {
  const { world } = useContext(WorldContext);

  const initialPosition = useMemo(() => world.generatePosition(), []);

  return (
    <PhysicsObject
      id="prize"
      sprite={{
        texture: Texture.WHITE,
        tint: 0xff0000,
        anchor: 0,
      }}
      initialRect={{
        x: initialPosition.x,
        y: initialPosition.y,
        w: 10,
        h: 10,
      }}
    />
  );
};
