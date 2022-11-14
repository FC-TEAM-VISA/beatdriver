import React from "react";
import Button from "./button";

const Grid = ({ grid, toggleActivation }) => {
  return (
    <div className="flex items-center bg-black my-10">
      <div className="flex-1 max-w-4xl mx-auto p-10">
        <ul className="grid grid-cols-8 grid-rows-4 gap-8">
          {grid.map((line, i) =>
            line.map((time, j) => {
              return (
                <>
                  <Button
                    key={i + j}
                    column={j + 1}
                    row={i + 1}
                    activated={grid[i][j]["activated"]}
                    triggered={grid[i][j]["triggered"]}
                    toggleActivation={() => toggleActivation(i, j)}
                  />
                </>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Grid;

//import React from "react";
// import Button from "./button";
// import Menu from "./menu";

// const Grid = ({ grid, toggleActivation }) => {
//   return (
//     <div className="min-h-screen flex items-center bg-black">
//       <div className="flex-1 max-w-4xl mx-auto p-10">
//         <ul className="grid grid-cols-8 grid-rows-6 gap-5">
//           {grid.map((line, i) => {
//             return (
//               <>
//                 <Button
//                   key={i}
//                   // column={j + 1}
//                   // row={i + 1}
//                   activated={grid[i]["activated"]}
//                   triggered={grid[i]["triggered"]}
//                   toggleActivation={() => toggleActivation(i)}
//                 />
//                 {/* <Menu /> */}
//               </>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Grid;
