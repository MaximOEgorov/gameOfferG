export const OFFER_STATUSES = {
    default: "default",
    miss: "miss",
    caught: "caught",
};

export const MOVE_DIRECTIONS = {
    up: 'UP',
    down: 'DOWN',
    right: 'RIGHT',
    left: 'LEFT'
}


export const _data = {
    // array for cells: cell = {x,y}
    settings: {
        rowsCount: 5,
        columnsCount: 4,
        pointsToWin: 10,
        maximumMisses: 3,
        decreaseDeltaInMs: 100,
        isMuted: false,
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
                incorrectMove: false,
                direction: MOVE_DIRECTIONS.down,
                previousDirection: MOVE_DIRECTIONS.up
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

function _afterMove(direction) {
    _data.coords.player1.current.previousDirection = _data.coords.player1.current.direction;
    _data.coords.player1.current.direction = direction;
    checkCatching();
    _notify();
}

export function movePlayer1Up() {
    if (_data.coords.player1.current.y === 1) {
        _data.coords.player1.current.incorrectMove = true;
    } else {
        _data.coords.player1.current.incorrectMove = false;
        _data.coords.player1.current.y -= 1;
    }
    _afterMove(MOVE_DIRECTIONS.up)
}

export function movePlayer1Down() {
    if (_data.coords.player1.current.y === _data.settings.rowsCount) {
        _data.coords.player1.current.incorrectMove = true;
    } else {
        _data.coords.player1.current.incorrectMove = false;
        _data.coords.player1.current.y += 1;
    }
    _afterMove(MOVE_DIRECTIONS.down)
}

export function movePlayer1Left() {
    if (_data.coords.player1.current.x === 1) {
        _data.coords.player1.current.incorrectMove = true;
    } else {
        _data.coords.player1.current.incorrectMove = false;
        _data.coords.player1.current.x -= 1;
    }
    _afterMove(MOVE_DIRECTIONS.left)
}

export function movePlayer1Right() {
    if (_data.coords.player1.current.x === _data.settings.columnsCount) {
        _data.coords.player1.current.incorrectMove = true;
    } else {
        _data.coords.player1.current.incorrectMove = false;
        _data.coords.player1.current.x += 1;
    }
    _afterMove(MOVE_DIRECTIONS.right)
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

export function selectMuteMode() {
    return _data.settings.isMuted;
}

export function selectIncorrectMove() {
   return _data.coords.player1.current.incorrectMove;
}

// ui - bll - dal
// solid, grasp, ddd
// чистая архитектура
// архитектура портов и адаптеров
// Мартин Фаулер, Рефакторинг
window.data = _data