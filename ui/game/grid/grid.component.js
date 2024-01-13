import {
  _data,
  movePlayer1Down,
  movePlayer1Left,
  movePlayer1Right,
  movePlayer1Up,
  selectPlayer1Coords,
  selectRowColumnCounts,
  subscribe,
} from "../../../data/game.data.js";
import { Cell } from "./cell/cell.component.js";
export function Grid() {
  const containerElement = document.createElement("table");

  subscribe(() => {
    update(containerElement);
  });
  update(containerElement);

  window.addEventListener("keydown", (e) => {
    const { x, y } = selectPlayer1Coords();
    const { rowsCount, columnsCount } = selectRowColumnCounts();

    switch (e.code) {
      case "ArrowUp":
        movePlayer1Up();
        break;
      case "ArrowDown":
        movePlayer1Down();
        break;
      case "ArrowRight":
        movePlayer1Right();
        break;
      case "ArrowLeft":
        movePlayer1Left();
        break;
    }
  });

  return containerElement;
}
function update(containerEl) {
  containerEl.innerHTML = "";
  for (let y = 1; y <= _data.settings.rowsCount; y++) {
    const row = document.createElement("tr");

    for (let x = 1; x <= _data.settings.columnsCount; x++) {
      const cell = Cell(x, y);

      row.append(cell);
    }
    containerEl.append(row);
  }
}
