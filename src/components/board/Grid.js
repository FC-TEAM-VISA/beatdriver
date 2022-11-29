import React from "react";
import Button from "./Button";

const Grid = ({ grid, toggleActivation, selectedInstrument }) => {
  return (
    <div className="flex items-center my-2">
      <div className="flex-1 max-w-4xl mx-auto p-5">
        <ul className="grid grid-cols-8 grid-rows-5 gap-8">
          {grid.map((line, row) =>
            line.map((time, col) => {
              return (
                <Button
                  key={row + col}
                  column={col}
                  row={row}
                  instrument={grid[row][col]["instrument"]}
                  activated={grid[row][col]["activated"]}
                  triggered={grid[row][col]["triggered"]}
                  toggleActivation={() => toggleActivation(row, col)}
                  selectedInstrument={selectedInstrument}
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
