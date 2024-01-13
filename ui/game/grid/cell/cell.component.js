import {
  OFFER_STATUSES,
  catchOffer,
  subscribe,
  selectCurrentOfferCoords,
  selectOfferStatus,
  selectPreviousOfferCoords,
  selectPlayer1Coords,
} from "../../../../data/game.data.js";
import { Image } from "../../../../ui-kit/ui-kit.js";

export function Cell(x, y) {
  const cellEl = document.createElement("td");

  update(x, y, cellEl);

  return cellEl;
}

function update(x, y, cellEl) {
  cellEl.innerHTML = "";

  if (
    x === selectCurrentOfferCoords().x &&
    y === selectCurrentOfferCoords().y
  ) {
    const offerEl = Image("assets/images/offer.png", {
      click: catchOffer,
    });
    cellEl.append(offerEl);
  }

  const didCatchOffer = selectOfferStatus() === OFFER_STATUSES.caught;
  const isCellCoordsEqualPrevious =
    x === selectPreviousOfferCoords().x && y === selectPreviousOfferCoords().y;

  if (didCatchOffer && isCellCoordsEqualPrevious) {
    const offerEl = Image("assets/images/caught-offer.png");
    cellEl.append(offerEl);
  }

  if (
    selectOfferStatus() === OFFER_STATUSES.miss &&
    x === selectPreviousOfferCoords().x &&
    y === selectPreviousOfferCoords().y
  ) {
    const offerEl = Image("assets/images/missed-offer.png");
    cellEl.append(offerEl);
  }
  const { x: player1X, y: player1Y } = selectPlayer1Coords();
  const isPlayer1InsideCell = x === player1X && y === player1Y;

  if (isPlayer1InsideCell) {
    const player1El = Image("assets/images/player1.png");
    cellEl.append(player1El);
  }
}
