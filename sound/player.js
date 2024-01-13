import { OFFER_STATUSES, _data, subscribe } from "../data/game.data.js";

export function Player() {
    const catchAudio = new Audio();
    catchAudio.src = 'assets/sounds/catch.wav'
    //catchAudio.play();

    let prevStatus = _data.offerStatus;

    subscribe(() => {
        if (_data.offerStatus === OFFER_STATUSES.caught && prevStatus !== OFFER_STATUSES.caught) {
            catchAudio.currentTime = 0;
            catchAudio.play();
        }

        prevStatus = _data.offerStatus;
    })
}