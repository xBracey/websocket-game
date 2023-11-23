import { useContext, useState } from "react";
import { useKeysPressed } from "./useKeysPressed";
import { WorldContext } from "../components/World/context";
import { useTick } from "@pixi/react";

export const useMovement = (
  id: string,
  speedValue: number,
  turningValue: number,
  frictionValue: number,
  maxSpeed: number
) => {
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(0);

  const { world } = useContext(WorldContext);

  useTick((delta) => {
    const rect = world.getItem(id);

    if (rect) {
      const isReverse = speed < 0;
      const calculatedSpeed = isReverse
        ? Math.max(speed, -maxSpeed)
        : Math.min(speed, maxSpeed);

      const x = Math.cos(rotation) * calculatedSpeed * delta;
      const y = Math.sin(rotation) * calculatedSpeed * delta;

      world.moveItem(id, x, y, rotation);

      setSpeed((speed) => speed * frictionValue);
    }
  });

  useKeysPressed([
    {
      key: "a",
      callback: (delta) => {
        setRotation((rotation) => rotation - turningValue * delta);
      },
    },
    {
      key: "d",
      callback: (delta) => {
        setRotation((rotation) => rotation + turningValue * delta);
      },
    },
    {
      key: "w",
      callback: (delta) => {
        setSpeed((speed) => speed + speedValue * delta);
      },
    },
    {
      key: "s",
      callback: (delta) => {
        setSpeed((speed) => speed - speedValue * 0.5 * delta);
      },
    },
  ]);

  return { rotation };
};
