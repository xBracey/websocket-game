import React, { useCallback, useMemo } from "react";
import "./index.css";
import { GameMemoised } from "./components/Game";

export const App = () => {
  const [points, setPoints] = React.useState(0);

  const addPoint = useCallback(() => {
    setPoints((points) => points + 1);
  }, [setPoints]);

  return (
    <div className="flex justify-center p-4 bg-gray-900 w-screen h-screen">
      <div className="text-3xl font-bold text-lime-300 w-full max-w-5xl flex flex-col items-center">
        <h1 className="my-4 text-center">Race Car Game</h1>
        <GameMemoised
          width={960}
          height={640}
          tileSize={64}
          addPoint={addPoint}
        />
        <div className="my-4 text-center">
          <p className="mt-2 text-lime-300">Points: {points}</p>
        </div>
      </div>
    </div>
  );
};
