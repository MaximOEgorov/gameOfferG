import { renderSelect } from "../../common/ui/select.js";

export function PointsToWinSelect() {
  const dataSelect = [
    { data: 20, name: 20 },
    { data: 30, name: 30 },
    { data: 40, name: 40 },
  ];

  const [wrapper, select] = renderSelect(dataSelect, null,'Points to Win');

  select.addEventListener("change", () => {
    select.blur();
  });
  return wrapper;
}
