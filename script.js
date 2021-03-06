'use strict';
const settings = {
    nameParentElement: 'chess',
    countRow: 8,
    countCol: 8,
    backgroundHeader: 'white',
    background: ['#454340', 'white', ],
    colorFigure: ['blue', 'black', ],
    firstMove: 'white',

};
const figure = {
    /*     bishop: 'B',
        rook: 'R',
        king: 'K',
        queen: 'Q',
        knight: 'H',
        pawn: 'P', */
    name: null,
    move() {

    }
};

const player = {
    color: null,
    figuresCellChessboard: null,
    init(color, figuresCellChessboard) {
        this.color = color;
        this.figuresCellChessboard = figuresCellChessboard;
        return this;
    },
}

const game = {
    playerOne: Object.assign({}, player),
    playerTwo: Object.assign({}, player),
    settings,
    figure,
    gameOver: false,
    containerElement: null,
    chessBoardElements: null,
    init() {

        this.containerElement = document.getElementById(this.settings.nameParentElement);
        this.initChessBoard();
    },
    playersCreate() {
        this.playerOne.init('black', {
            R: [9, 16],
            H: [10, 15],
            B: [11, 14],
            K: 12,
            Q: 13,
            P: [18, 19, 20, 21, 22, 23, 24, 25],
        });
        this.playerTwo.init('white', {
            R: [72, 79],
            H: [73, 78],
            B: [74, 77],
            K: 75,
            Q: 76,
            P: [63, 64, 65, 66, 67, 68, 69, 70],
        });
    },
    initChessBoard() {
        this.chessBoardElements = [];
        let selector = 0;
        for (let i = 0; i <= this.settings.countRow; i++) {
            const tr = document.createElement('tr');
            for (let y = 0; y <= settings.countCol; y++) {
                const td = document.createElement('td');
                if (y === 8) {
                    td.style.background = this.settings.background[2];
                    i !== 0 ? td.innerText = td.innerText = i : td.innerText = '';
                } else if (i === 0) {
                    td.style.background = this.settings.background[2];
                    y !== 8 ? td.innerText = String.fromCharCode(65 + y) : td.innerText = '';

                } else {
                    td.style.background = this.settings.background[selector];
                }
                selector === 0 ? selector = 1 : selector = 0;
                tr.appendChild(td);
                this.chessBoardElements.push(td);
            }
            this.containerElement.appendChild(tr);
        }
    },
    render() {
        this.chessBoardElements.forEach((td, index) => {
            for (const [key, value] of Object.entries(this.playerOne.figuresCellChessboard)) {
                if (Array.isArray(value))
                    if (value.includes(index)) {
                        td.innerText = key;
                        td.style.color = this.settings.colorFigure[0];
                    }
                if (value === index) {
                    td.innerText = key;
                    td.style.color = this.settings.colorFigure[0];
                }
            };
            for (const [key, value] of Object.entries(this.playerTwo.figuresCellChessboard)) {
                if (Array.isArray(value))
                    if (value.includes(index)) td.innerText = key;
                if (value === index) td.innerText = key;
            };
        });
    },
    run() {
        this.init();
        this.playersCreate()
        this.render();
    },
};
game.run();