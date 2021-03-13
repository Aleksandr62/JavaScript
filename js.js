"use strict";

const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
    countBarriers: 5, // ############################# task 2
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },
    getBarriersCount() {
        return this.settings.countBarriers; // ############################# task 2
    },

    validate() {
        const result = {
            isValid: true,
            error: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        if (this.getBarriersCount() < 2 || this.getBarriersCount() > 15) { // ############################# task 2
            result.isValid = false;
            result.errors.push('Неверные настройки, значение countBarriers должно быть в диапазоне [2, 15].');
        }

        return result;
    },
};

const map = {
    cells: null,
    usedCells: null,

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {}; // {x1_y1: td, x1_y2: td}
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);

                this.cells[`x${col}_y${row}`] = td;
            }
        }
    },

    render(snakePointsArray, foodPoint, barrierPointsArray) { // ############################# task 2
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];
        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];

            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];

        foodCell.classList.add('food');
        this.usedCells.push(foodCell);
        barrierPointsArray.forEach((point) => {
            const barrierCell = this.cells[`x${point.x}_y${point.y}`]; // ############################# task 2

            barrierCell.classList.add('barrier'); // ############################# task 2
            this.usedCells.push(barrierCell); // ############################# task 2
        });
    },
};

const snake = {
    config, // ############################# task 3
    body: null,
    direction: null,
    lastStepDirection: null,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    isOnPoint(point) {
        return this.body.some((snakePoint) => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint()); // [p3, p2, p1] => [p4, p3, p2]
        this.body.pop();
    },

    growUp() {
        const lastBodyIndex = this.body.length - 1;
        const lastBodyPoint = this.body[lastBodyIndex];
        this.body.push(lastBodyPoint);
    },

    getNextStepHeadPoint() {
        const headPoint = this.body[0];
        const rowsCount = config.getRowsCount(); // ############################# task 3
        const colsCount = config.getColsCount(); // ############################# task 3

        switch (this.direction) { // ############################# task 3
            case 'up':
                return (headPoint.y - 1) < 0 ? { x: headPoint.x, y: +rowsCount - 1 } : { x: headPoint.x, y: headPoint.y - 1 };
            case 'right':
                return (headPoint.x + 1) > (colsCount - 1) ? { x: 0, y: headPoint.y } : { x: headPoint.x + 1, y: headPoint.y };
            case 'down':
                return (headPoint.y + 1) > (rowsCount - 1) ? { x: headPoint.x, y: 0 } : { x: headPoint.x, y: headPoint.y + 1 };
            case 'left':
                return (headPoint.x - 1) < 0 ? { x: +colsCount - 1, y: headPoint.y } : { x: headPoint.x - 1, y: headPoint.y };
        };
    },

    setDirection(direction) {
        this.direction = direction;
    },
};

const food = {
    x: null,
    y: null,
    foodScore: 10, // ############################# task 1

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
    getFoodScore() { // ############################# task 1
        return this.foodScore;
    },
};

const barrier = { // ############################# task 2
    cellsArray: null,
    init(point) {
        this.cellsArray = [];
        this.cellsArray.push({ x: point.x, y: point.y });
    },

    getBarriersArray() {
        return this.cellsArray;
    },

    setCoordinates(point) {
        this.cellsArray.push({ x: point.x, y: point.y });
    },

    isOnPoint(point) {
        return this.cellsArray.some((barrierPoint) => barrierPoint.x === point.x && barrierPoint.y === point.y);
    },

};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    barrier, // ############################# task 2
    status,
    tickInterval: null,
    scoreBoard: document.getElementById('gameScore'), // ############################# task 1
    score: null, // ############################# task 1

    init(userSettings) {
        this.config.init(userSettings);
        const validation = this.config.validate();
        this.scoreBoard.innerText = 'Score: ' + 0; // ############################# task 1
        this.score = 0; // ############################# task 1

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.log(err);
            }

            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventHandlers();
        this.reset();
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        // document.getElementById('newGameButton').addEventListener('click', this.newGameClickHandler.bind(this));
        document.addEventListener('keydown', (event) => {
            this.keyDownHandler(event);
        });
    },

    playClickHandler() {
        if (this.status.isPlaying()) this.stop();
        else if (this.status.isStopped()) this.play();
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) this.snake.setDirection(direction);
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.barrier.init(this.getRandomFreeCoordinates());
        for (let i = 0; i < this.config.getBarriersCount(); i++) {
            this.barrier.setCoordinates(this.getRandomFreeCoordinates()); // ############################# task 2
        };
        this.render();
    },

    getStartSnakeBody() {
        return [{
            x: Math.floor(this.config.getColsCount() / 2),
            y: Math.floor(this.config.getRowsCount() / 2),
        }];
    },

    getRandomFreeCoordinates() {
        const exclude = this.barrier.cellsArray !== null ? [this.food.getCoordinates(), ...this.barrier.getBarriersArray(), ...this.snake.getBody()] : [this.food.getCoordinates(), ...this.snake.getBody()]; // ############################# task 2
        // without ... -  [{}, [{}, {}, {}]] => with ... [{}, {}, {}, {}];
        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some((exPoint) => {
                    return rndPoint.x === exPoint.x && rndPoint.y === exPoint.y;
                })) return rndPoint;
        }
    },

    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.barrier.getBarriersArray()); // ############################# task 2
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => {
            this.tickHandler();
        }, 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },

    setPlayButton(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    tickHandler() {
        if (!this.canMakeStep()) return this.finish();

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            this.score = this.score + this.food.getFoodScore(); // ############################# task 1
            this.scoreBoard.innerText = 'Score: ' + this.score;
            this.food.setCoordinates(this.getRandomFreeCoordinates());

            if (this.isGameWon()) this.finish();
        }
        this.snake.makeStep();
        this.render();
    },

    canMakeStep() {
        const nextStepPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isOnPoint(nextStepPoint) &&
            !this.barrier.isOnPoint(nextStepPoint) // ############################# task 2
            /* && // ############################# task 3
                       nextStepPoint.x < this.config.getColsCount() &&
                       nextStepPoint.y < this.config.getRowsCount() &&
                       nextStepPoint.x >= 0 &&
                       nextStepPoint.y >= 0; */
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },
};

game.init({ speed: 5 });