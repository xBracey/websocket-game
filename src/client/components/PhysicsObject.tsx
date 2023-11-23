import React, { ComponentProps, useContext, useEffect, useState } from "react";
import { WorldContext } from "./World/context";
import { Sprite, useTick } from "@pixi/react";
import { IRect } from "bump-ts";

interface IPhysicsObject {
  id: string;
  initialRect: IRect;
  sprite: ComponentProps<typeof Sprite>;
}

const PhysicsObject = ({ id, initialRect, sprite }: IPhysicsObject) => {
  const [rect, setRect] = useState(initialRect);
  const { world } = useContext(WorldContext);
  const { x, y, w, h } = rect;

  useEffect(() => {
    world.addBox(id, rect);
  }, []);

  useTick(() => {
    const item = world.getItem(id);

    if (!item) return;

    const pos = item.getCentroid();

    if (pos && (pos.x !== x || pos.y !== y)) {
      setRect((rect) => ({
        ...rect,
        x: pos.x,
        y: pos.y,
      }));
    }
  });

  return <Sprite {...sprite} x={x} y={y} width={w} height={h} anchor={0} />;
};

export default PhysicsObject;
