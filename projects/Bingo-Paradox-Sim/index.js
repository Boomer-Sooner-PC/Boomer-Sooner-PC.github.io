function setup() {
    const BOARD_COUNT = parseInt(document.getElementById("num-boards").value);
    const GAME_COUNT = parseInt(document.getElementById("num-games").value);
    const FREE = document.getElementById("free-space").checked;

    document.BOARD_COUNT = BOARD_COUNT;
    document.GAME_COUNT = GAME_COUNT;
    document.FREE = FREE;

    document.ROUND_TIME = 0;
    document.GAME_TIME = 0;

    console.log("Boards: " + BOARD_COUNT);
    console.log("Games: " + GAME_COUNT);
    console.log(FREE);

    document.BOARDS = [];
    document.CALLS = [];
    document.WINS = [];

    generate();
}

function generate() {
    document.BOARDS = [];
    document.RS_BOARDS = [];

    let BOARDS = [];

    for (let i = 0; i < document.BOARD_COUNT; i++) {
        let board = makeBoard(document.FREE);
        BOARDS.push(board);
    }

    document.BOARDS = BOARDS;

    updateBoardsHTML();
}

function resetBoard(board) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            board[j][i] = Math.abs(board[j][i]);
        }
    }

    if (document.FREE) {
        board[2][2] = -1;
    }

    return board;
}

function reset() {
    document.BOARDS = document.BOARDS.map((board) => resetBoard(board));
    document.CALLS = [];
    updateBoardsHTML();
    updateChart();
}

function makeBoard(free) {
    let board = [];

    let B = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let I = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    let N = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
    let G = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
    let O = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];

    let rows = [B, I, N, G, O];

    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            let index = Math.floor(Math.random() * rows[i].length);
            row.push(rows[i].splice(index, 1)[0]);
            rows[i].splice(index, 1);
        }
        board.push(row);
    }

    if (free) {
        board[2][2] = -1;
    }

    return board;
}

function checkWin(board) {
    let win = false;
    let type = "";
    // Check rows
    for (let i = 0; i < 5; i++) {
        if (board[i].every((num) => num < 0)) {
            win = true;
            type = "column";
        }
    }

    // Check columns
    for (let i = 0; i < 5; i++) {
        let column = [];
        for (let j = 0; j < 5; j++) {
            column.push(board[j][i]);
        }
        if (column.every((num) => num < 0)) {
            win = true;
            type = "row";
        }
    }

    // Check diagonals
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < 5; i++) {
        diagonal1.push(board[i][i]);
        diagonal2.push(board[i][4 - i]);
    }
    if (
        diagonal1.every((num) => num < 0) ||
        diagonal2.every((num) => num < 0)
    ) {
        win = true;
        type = "diagonal";
    }

    return [win, type];
}

function boardToHTML(board) {
    let html = `<div class="bingo-board"}>`;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            html += `<div class="bingo-square" ${
                board[j][i] < 0
                    ? 'style="background-color: green !important;"'
                    : ""
            }>${
                board[j][i] < 0
                    ? board[j][i] == -1
                        ? ""
                        : board[j][i] * -1
                    : board[j][i]
            }</div>`;
        }
    }
    html += "</div>";
    return html;
}

function updateBoard(board, number) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (board[j][i] === number) {
                board[j][i] = board[j][i] * -1;
            }
        }
    }
    return board;
}

function updateBoardsHTML() {
    let container = document.getElementById("boards");

    let text = "";
    for (let board of document.BOARDS) {
        text += boardToHTML(board);
    }

    container.innerHTML = text;

    document.getElementById("sim-remaining").innerHTML = document.GAME_COUNT;
    let rw, cw, dw;
    rw = cw = dw = 0;
    for (let win of document.WINS) {
        if (win == "row") {
            rw += 1;
        } else if (win == "column") {
            cw += 1;
        } else {
            dw += 1;
        }
    }

    document.getElementById("row-wins").innerHTML = rw;
    document.getElementById("col-wins").innerHTML = cw;
    document.getElementById("diag-wins").innerHTML = dw;
}

function iterate() {
    let call = Math.floor(Math.random() * 75) + 1;
    while (document.CALLS.includes(call)) {
        call = Math.floor(Math.random() * 75) + 1;
    }

    document.CALLS.push(call);

    document.BOARDS = document.BOARDS.map((board) => updateBoard(board, call));

    updateBoardsHTML();
}

function getWinners() {
    let winners = [];
    for (let board of document.BOARDS) {
        if (checkWin(board)[0]) {
            winners.push(checkWin(board)[1]);
        }
    }
    return winners;
}

function playGame() {
    let i = 0;
    while (i <= 5 && getWinners().length == 0) {
        iterate();
        // i++;
    }
    for (let wins of getWinners()) {
        document.WINS.push(wins);
    }
}

function genPlayGame() {
    // generate();
    reset();
    playGame();
    console.log(document.BOARDS);
    console.log(document.CALLS);

    document.GAME_COUNT -= 1;
}

function updateChart() {
    let rw, cw, dw;
    rw = cw = dw = 1;
    for (let win of document.WINS) {
        if (win == "row") {
            rw += 1;
        } else if (win == "column") {
            cw += 1;
        } else {
            dw += 1;
        }
    }

    let chart = new CanvasJS.Chart("chart", {
        title: {
            text: "Bingo Win Type Distribution",
        },
        legend: {
            verticalAlign: "center",
            horizontalAlign: "right",
        },
        data: [
            {
                type: "pie",
                showInLegend: true,
                legendText: "{indexLabel} #percent%",
                dataPoints: [
                    { y: rw, indexLabel: "Row" },
                    { y: cw, indexLabel: "Column" },
                    { y: dw, indexLabel: "Diagonal" },
                ],
            },
        ],
    });

    chart.render();

    // console.log(chart);
}

function run() {
    if (document.GAME_COUNT > 0) {
        console.log(document.GAME_COUNT);
        genPlayGame();
        updateBoardsHTML();
        updateChart();
        requestAnimationFrame(run);
    }
}
