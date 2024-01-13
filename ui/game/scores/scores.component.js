import { _data, subscribe } from "../../../data/game.data.js";
export function Scores() {

    subscribe(() => {
        containerElement.innerHTML = '';
        update(containerElement);
    })

    const containerElement = document.createElement('div');
    containerElement.classList.add('score')
    const scoreElement = document.createElement('p');
    update(scoreElement);
    containerElement.append(scoreElement);
    return containerElement;
}

function update(containerElement) {
    containerElement.innerHTML = '';
    let spanEl = document.createElement('span');
    spanEl.append('Catch:');
    containerElement.append(spanEl);
    spanEl = document.createElement('span');
    spanEl.append(data.score.caughtCount)
    containerElement.append(spanEl);
    spanEl = document.createElement('span');
    spanEl.append('Miss:');
    containerElement.append(spanEl);
    spanEl = document.createElement('span');
    spanEl.append(data.score.missCount);
    containerElement.append(spanEl);
}