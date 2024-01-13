import {selectPlayer1Coords} from "../../../data/game.data.js";
import {Image} from "../../../ui-kit/ui-kit.js";

export function Player(x, y) {
    const { x: player1X, y: player1Y } = selectPlayer1Coords();
    const isPlayer1InsideCell = x === player1X && y === player1Y;

    if (isPlayer1InsideCell) {
        return Image("assets/images/player1.png");
    }
}