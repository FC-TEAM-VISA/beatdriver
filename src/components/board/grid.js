import React from "react";
import Button from "./button";

const Grid = ({ grid, toggleActivation }) => {
  return (
    <div className="flex items-center bg-black my-10">
      <div className="flex-1 max-w-4xl mx-auto p-10">
        <ul className="grid grid-cols-8 grid-rows-4 gap-8">
          {grid.map((line, row) =>
            line.map((time, col) => {
              return (
                <Button
                  key={row + col}
                  column={col + 1}
                  row={row + 1}
                  activated={grid[row][col]["activated"]}
                  triggered={grid[row][col]["triggered"]}
                  toggleActivation={() => toggleActivation(row, col)}
                />
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Grid;
