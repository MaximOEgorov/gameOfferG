import {Game} from './ui/game/game.component.js'
import {subscribe} from './data/game.data.js'
import {Player} from './sound/player.js'

Player();

//subscribe(renderApp);

function renderApp() {
  document.body.innerHTML = "";

  const gameEl = Game();
  document.body.append(gameEl);
}

renderApp();