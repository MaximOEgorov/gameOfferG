export const OFFER_STATUSES = {
  default: "default",
  miss: "miss",
  caught: "caught",
};

export const _data = {
  // array for cells: cell = {x,y}
  settings: {
    rowsCount: 5,
    columnsCount: 4,
    pointsToWin: 10,
    maximumMisses: 3,
    decreaseDeltaInMs: 100,
    isMuted: true,
  },
  offerStatus: OFFER_STATUSES.default,
  coords: {
    offer: {
      current: {
        x: 1,
        y: 0,
      },
      previous: {
        x: 1,
        y: 2,
      },
    },
    player1: {
      current: {
        x: 2,
        y: 2,
      },
    },
  },
  score: {
    missCount: 3,
    caughtCount: 2,
  },
};

let _subscribers = [];

function _notify() {
  _subscribers.forEach((subscriber) => subscriber());
}

let _stepIntervalId;

function _runStepInterval() {
  _stepIntervalId = setInterval(() => {
    _missOffer();
    _moveOfferToRandomPosition(true);
    _notify();
  }, 2000);
}

_runStepInterval();

function _moveOfferToRandomPosition() {
  let newX = null;
  let newY = null;

  do {
    newX = _getRandom(_data.settings.columnsCount - 1);
    newY = _getRandom(_data.settings.rowsCount - 1);

    var offerIsOnNewCoords =
      _data.coords.offer.current.x === newX &&
      _data.coords.offer.current.y === newY;
    var playerIsOnNewCoords =
      _data.coords.player1.current.x === newX &&
      _data.coords.player1.current.y === newY;
  } while (offerIsOnNewCoords || playerIsOnNewCoords);

  _data.coords.offer.current.x = newX;
  _data.coords.offer.current.y = newY;
}

function _missOffer() {
  _data.offerStatus = OFFER_STATUSES.miss;
  _data.score.missCount++;

  _data.coords.offer.previous = {
    ..._data.coords.offer.current,
  };
  setTimeout(() => {
    _data.offerStatus = OFFER_STATUSES.default;
    _notify();
  }, 200);
}

function _getRandom(N) {
  return Math.floor(Math.random() * (N + 1));
}

// setter
export function catchOffer() {
  _data.offerStatus = OFFER_STATUSES.caught;
  _data.score.caughtCount++;
  _data.coords.offer.previous = {
    ..._data.coords.offer.current,
  };
  setTimeout(() => {
    _data.offerStatus = OFFER_STATUSES.default;
    _notify();
  }, 200);

  _moveOfferToRandomPosition();
  _notify();
  clearInterval(_stepIntervalId);
  _runStepInterval();
}

export function subscribe(newSubscriber) {
  _subscribers.push(newSubscriber);
}

export function movePlayer1Up() {
  _data.coords.player1.current.y -= 1;
  checkCatching();
  _notify();
}
export function movePlayer1Down() {
  _data.coords.player1.current.y += 1;
  checkCatching();
  _notify();
}
export function movePlayer1Left() {
  _data.coords.player1.current.x = _data.coords.player1.current.x - 1;
  checkCatching();
  _notify();
}
export function movePlayer1Right() {
  _data.coords.player1.current.x = _data.coords.player1.current.x + 1;
  checkCatching();
  _notify();
}

function checkCatching() {
  if (
    selectPlayer1Coords().x === selectCurrentOfferCoords().x &&
    selectPlayer1Coords().y === selectCurrentOfferCoords().y
  ) {
    console.log("win");
    catchOffer();
  }
}

// SELECTORS

// getter
export function selectCurrentOfferCoords() {
  return _data.coords.offer.current;
}
export function selectRowColumnCounts() {
  return {
    columsCount: _data.settings.columnsCount,
    rowsCount: _data.settings.rowsCount,
  };
}

export function selectPreviousOfferCoords() {
  return _data.coords.offer.previous;
}

export function selectOfferStatus() {
  return _data.offerStatus;
}

export function selectPlayer1Coords() {
  return _data.coords.player1.current;
}

// ui - bll - dal
// solid, grasp, ddd
// чистая архитектура
// архитектура портов и адаптеров
// Мартин Фаулер, Рефакторинг
