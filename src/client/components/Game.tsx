import React from "react";
import { Player } from "./Player";
import World from "./World";
import { Border } from "./Border";
import { Prize } from "./Prize";

interface GameProps {
  width: number;
  height: number;
  tileSize: number;
  addPoint: () => void;
}

export const Game = ({ width, height, tileSize, addPoint }: GameProps) => {
  return (
    <World width={width} height={height} addPoint={addPoint}>
      <Border width={width} height={height} thickness={tileSize / 4} />
      <Player />
      <Prize />
    </World>
  );
};

export const GameMemoised = React.memo(Game);
