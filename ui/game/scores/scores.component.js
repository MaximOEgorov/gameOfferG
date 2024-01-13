import { _data, subscribe } from "../../../data/game.data.js";
export function Scores() {

    subscribe(() => {
        containerElement.innerHTML = '';
        update(containerElement);
    })

    const containerElement = document.createElement('div');
    update(containerElement);

    return containerElement;
}

function update(containerElement) {
    containerElement.append('catch: ' + _data.score.caughtCount + '; miss: ' + _data.score.missCount);
}