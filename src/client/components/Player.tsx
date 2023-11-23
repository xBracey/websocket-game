import React, { useContext } from "react";
import PhysicsObject from "./PhysicsObject";
import { useMovement } from "../utils/useMovement";

interface PlayerProps {}

export const Player = ({}: PlayerProps) => {
  const id = "Player";

  const { rotation } = useMovement(id, 0.5, 0.05, 0.97, 10);

  return (
    <PhysicsObject
      id={id}
      initialRect={{
        x: 200,
        y: 200,
        w: 32,
        h: 16,
      }}
      sprite={{
        image: "/public/race-car.svg",
        anchor: 0.5,
        rotation,
      }}
    />
  );
};
