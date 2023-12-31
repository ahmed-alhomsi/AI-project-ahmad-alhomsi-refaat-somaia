class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

class PriorityQueue {
    constructor(comparator) {
        this.items = [];
        this.comparator = comparator || ((a, b) => a.priority - b.priority);
    }

    enqueue(item, priority) {
        this.items.push({ item, priority });
        this.items.sort(this.comparator);
    }

    dequeue() {
        return this.items.shift().item;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

const board = [
    ["X", "X", "X", "X", "X", "X"],
    ["X", " ", " ", " ", " ", "X", " "],
    ["X", " ", "X", " ", " ", "G", " "],
    ["X", " ", " ", "X", " ", " ", " "],
    ["X", " ", " ", " ", " ", " ", " "],
    ["X", " ", "S", " ", " ", " ", " "],
    ["X", "X", " ", " ", " ", "X", " "],
];

const knightMoves = [
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
];

function isMoveValid(row, col) {
    return (
        row >= 0 &&
        row < board.length &&
        col >= 0 &&
        col < board[row].length &&
        board[row][col] !== "X" &&
        board[row][col] !== "S"
    );
}

function updateGrid() {
    const grid = document.querySelector(".grid");

    for (let row = 1; row < board.length; row++) {
        const currentRow = grid.children[row - 1];

        for (let col = 1; col < board[row].length; col++) {
            const currentCell = currentRow.children[col - 1];

            currentCell.classList.remove(
                "fa-solid",
                "fa-chess-knight",
                "fa-bullseye",
                "fa-ban"
            );

            if (board[row][col] === " ") {
                continue;
            }

            if (board[row][col] === "S") {
                currentCell.classList.add("fa-solid");
                currentCell.classList.add("fa-chess-knight");
            } else if (board[row][col] === "G") {
                currentCell.classList.add("fa-solid");
                currentCell.classList.add("fa-bullseye");
            } else if (board[row][col] === "X") {
                currentCell.classList.add("fa-solid");
                currentCell.classList.add("fa-ban");
            } else {
                currentCell.classList.add("fa-solid", "fa-chess-knight");
            }
        }
    }
}   

// async function dfs(startRow, startCol) {
//     const stack = new Stack();
//     stack.push({ row: startRow, col: startCol, path: [{ row: startRow, col: startCol }] });

//     const visited = new Set();
//     const HorseGameGrid = document.querySelector(".grid");
//     const delay = 1000;

//     async function recursiveDFS() {
//         if (stack.isEmpty()) {
//             console.log("Path not found!");
//             return false;
//         }

//         const { row, col, path } = stack.pop();

//         visited.add(`${row}-${col}`);
//         board[row][col] = ".";
//         updateGrid();

//         await new Promise((resolve) => setTimeout(resolve, delay));

//         for (const [dr, dc] of knightMoves) {
//             const newRow = row + dr;
//             const newCol = col + dc;

//             if (isMoveValid(newRow, newCol) && board[newRow][newCol] === "G") {
//                 console.log(path)
//                 console.log("Path found!");

//                 // show last knight
//                 HorseGameGrid.children[newRow - 1]?.children[newCol - 1]?.classList.add(
//                     "fa-solid",
//                     "fa-chess-knight"
//                 );

//                 return path.concat([{ row: newRow, col: newCol }]);
//             }

//             const newPosition = `${newRow}-${newCol}`;

//             if (
//                 isMoveValid(newRow, newCol) &&
//                 !visited.has(newPosition) &&
//                 board[newRow][newCol] === " "
//             ) {
//                 visited.add(newPosition);
//                 board[newRow][newCol] = ".";
//                 stack.push({ row: newRow, col: newCol, path: path.concat([{ row: newRow, col: newCol }]) });

//                 HorseGameGrid.children[newRow - 1]?.children[newCol - 1]?.classList.add(
//                     "fa-solid",
//                     "fa-chess-knight"
//                 );

//                 console.log(`Move to (${newRow}, ${newCol})`);

//                 const result = await recursiveDFS();
//                 if (result) {
//                     return result;
//                 }

//                 HorseGameGrid.children[newRow - 1]?.children[newCol - 1]?.classList.remove(
//                     "fa-solid",
//                     "fa-chess-knight"
//                 );

//                 board[newRow][newCol] = ".";
//             }
//         }

//         HorseGameGrid.children[row - 1]?.children[col - 1]?.classList.remove("fa-solid", "fa-chess-knight");

//         board[row][col] = " ";

//         return false;
//     }

//     console.log(`started at ${startRow},${startCol}`);
//     return await recursiveDFS();
// }

// async function bfs(startRow, startCol) {
//     const queue = new Queue();
//     queue.enqueue({ row: startRow, col: startCol, path: [{ row: startRow, col: startCol }] });

//     const visited = new Set();
//     const HorseGameGrid = document.querySelector(".grid");
//     const delay = 1000;

//     while (!queue.isEmpty()) {
//         const { row, col, path } = queue.dequeue();

//         visited.add(`${row}-${col}`);
//         board[row][col] = ".";
//         updateGrid();

//         for (const [dr, dc] of knightMoves) {
//             const newRow = row + dr;
//             const newCol = col + dc;

//             if (isMoveValid(newRow, newCol) && board[newRow][newCol] === "G") {
//                 console.log("Path found!");
//                 path.push({ row: 2, col: 5})
//                 console.log(path)
//                 // add last knight
//                 HorseGameGrid.children[newRow - 1]?.children[newCol - 1]?.classList.add(
//                     "fa-solid",
//                     "fa-chess-knight"
//                 );

//                 return path.concat([{ row: newRow, col: newCol }]);
//             }

//             const newPosition = `${newRow}-${newCol}`;
//             if (isMoveValid(newRow, newCol) && !visited.has(newPosition) && board[newRow][newCol] === " ") {
//                 visited.add(newPosition);
//                 board[newRow][newCol] = ".";
//                 queue.enqueue({ row: newRow, col: newCol, path: path.concat([{ row: newRow, col: newCol }]) });

//                 HorseGameGrid.children[newRow - 1]?.children[newCol - 1]?.classList.add("fa-solid", "fa-chess-knight");
//                 await new Promise((resolve) => setTimeout(resolve, delay));

//                 console.log(`Move to (${newRow}, ${newCol})`);
//             }
//         }

//         board[row][col] = " ";
//         updateGrid();

//         await new Promise((resolve) => setTimeout(resolve, delay));
//     }

//     console.log("Path not found!");
//     return null;
// }

async function dfs(startRow, startCol) {
    const stack = new Stack();
    stack.push({ row: startRow, col: startCol, path: [{ row: startRow, col: startCol }] });

    const visited = new Set();
    const HorseGameGrid = document.querySelector(".grid");
    const movesList = document.getElementById("movesList");
    const finalPathList = document.getElementById("finalPathList");
    const delay = 1000;

    async function recursiveDFS() {
        if (stack.isEmpty()) {
            console.log("Path not found!");
            return false;
        }

        const { row, col, path } = stack.pop();

        visited.add(`${row}-${col}`);
        board[row][col] = ".";
        updateGrid();

        await new Promise((resolve) => setTimeout(resolve, delay));

        for (const [dr, dc] of knightMoves) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (isMoveValid(newRow, newCol) && board[newRow][newCol] === "G") {
                console.log("Path found!");
                finalPathList.innerHTML = path
                    .concat([{ row: newRow, col: newCol }])
                    .map((pos) => `<li>(${pos.row}, ${pos.col})</li>`)
                    .join("");
                return path.concat([{ row: newRow, col: newCol }]);
            }

            const newPosition = `${newRow}-${newCol}`;

            if (
                isMoveValid(newRow, newCol) &&
                !visited.has(newPosition) &&
                board[newRow][newCol] === " "
            ) {
                visited.add(newPosition);
                board[newRow][newCol] = ".";
                stack.push({ row: newRow, col: newCol, path: path.concat([{ row: newRow, col: newCol }]) });

                HorseGameGrid.children[newRow - 1]?.children[newCol - 1]?.classList.add(
                    "fa-solid",
                    "fa-chess-knight"
                );

                console.log(`Move to (${newRow}, ${newCol})`);

                // Add move to the moves list
                movesList.innerHTML += `<li>(${newRow}, ${newCol})</li>`;

                const result = await recursiveDFS();
                if (result) {
                    return result;
                }

                HorseGameGrid.children[newRow - 1]?.children[newCol - 1]?.classList.remove(
                    "fa-solid",
                    "fa-chess-knight"
                );

                board[newRow][newCol] = ".";
            }
        }

        HorseGameGrid.children[row - 1]?.children[col - 1]?.classList.remove("fa-solid", "fa-chess-knight");

        board[row][col] = " ";

        return false;
    }

    console.log(`started at ${startRow},${startCol}`);
    return await recursiveDFS();
}

async function bfs(startRow, startCol) {
    const queue = new Queue();
    queue.enqueue({ row: startRow, col: startCol, path: [{ row: startRow, col: startCol }] });

    const visited = new Set();
    const HorseGameGrid = document.querySelector(".grid");
    const movesList = document.getElementById("movesList");
    const finalPathList = document.getElementById("finalPathList");
    const delay = 1000;

    while (!queue.isEmpty()) {
        const { row, col, path } = queue.dequeue();

        visited.add(`${row}-${col}`);
        board[row][col] = ".";
        updateGrid();

        for (const [dr, dc] of knightMoves) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (isMoveValid(newRow, newCol) && board[newRow][newCol] === "G") {
                console.log("Path found!");
                finalPathList.innerHTML = path
                    .concat([{ row: newRow, col: newCol }])
                    .map((pos) => `<li>(${pos.row}, ${pos.col})</li>`)
                    .join("");
                return path.concat([{ row: newRow, col: newCol }]);
            }

            const newPosition = `${newRow}-${newCol}`;
            if (isMoveValid(newRow, newCol) && !visited.has(newPosition) && board[newRow][newCol] === " ") {
                visited.add(newPosition);
                board[newRow][newCol] = ".";
                queue.enqueue({ row: newRow, col: newCol, path: path.concat([{ row: newRow, col: newCol }]) });

                HorseGameGrid.children[newRow - 1]?.children[newCol - 1]?.classList.add("fa-solid", "fa-chess-knight");
                await new Promise((resolve) => setTimeout(resolve, delay));

                console.log(`Move to (${newRow}, ${newCol})`);

                // Add move to the moves list
                movesList.innerHTML += `<li>(${newRow}, ${newCol})</li>`;
            }
        }

        board[row][col] = " ";
        updateGrid();

        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    console.log("Path not found!");
    return null;
}


function euclideanDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
    
async function visualizePath(path) {
            const HorseGameGrid = document.querySelector(".grid");
        
            let i = 0;
            const intervalId = setInterval(() => {
                if (i < path.length) {
                    const { row, col } = path[i];
        
                    HorseGameGrid.children[row - 1]?.children[col - 1]?.classList.remove(
                        "fa-solid",
                        "fa-chess-knight"
                    );
        
                    board[row][col] = ".";
                    updateGrid();
        
                    HorseGameGrid.children[row - 1]?.children[col - 1]?.classList.add(
                        "fa-solid",
                        "fa-chess-knight"
                    );
        
                    i++;
                } else {
                    clearInterval(intervalId);
                }
            }, 1000);
}

async function hillClimbing(startRow, startCol, goalRow, goalCol, path = [{ row: startRow, col: startCol }]) {
    const priorityQueue = new PriorityQueue((a, b) => {
        const distanceA = euclideanDistance(a.row, a.col, goalRow, goalCol);
        const distanceB = euclideanDistance(b.row, b.col, goalRow, goalCol);
        return distanceA - distanceB;
    });

    priorityQueue.enqueue({ row: startRow, col: startCol }, 0);

    const HorseGameGrid = document.querySelector(".grid");

    let delay = 1000;

    while (startRow !== goalRow || startCol !== goalCol) {
        let minDistance = Number.POSITIVE_INFINITY;
        let nextRow = startRow;
        let nextCol = startCol;

        for (const [dr, dc] of knightMoves) {
            const newRow = startRow + dr;
            const newCol = startCol + dc;

            if (isMoveValid(newRow, newCol)) {
                const distance = euclideanDistance(newRow, newCol, goalRow, goalCol);

                if (distance < minDistance) {
                    minDistance = distance;
                    nextRow = newRow;
                    nextCol = newCol;
                }
            }
        }

        HorseGameGrid.children[startRow - 1]?.children[startCol - 1]?.classList.remove(
            "fa-solid",
            "fa-chess-knight"
        );
        board[startRow][startCol] = ".";

        HorseGameGrid.children[nextRow - 1]?.children[nextCol - 1]?.classList.add(
            "fa-solid",
            "fa-chess-knight"
        );
        board[nextRow][nextCol] = ".";

        path.push({ row: nextRow, col: nextCol });

        startRow = nextRow;
        startCol = nextCol;

        await new Promise(resolve => setTimeout(resolve, delay));
    }


    if (startRow !== goalRow || startCol !== goalCol) {
        console.log("Path not found!");
        return null;
    }

    console.log("Goal reached!");

    return path;
}

function euclideanDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

async function visualizePath(path) {
    const HorseGameGrid = document.querySelector(".grid");

    let i = 0;
    const intervalId = setInterval(() => {
        if (i < path.length) {
            const { row, col } = path[i];

            HorseGameGrid.children[row - 1]?.children[col - 1]?.classList.remove(
                "fa-solid",
                "fa-chess-knight"
            );

            board[row][col] = ".";
            updateGrid();

            HorseGameGrid.children[row - 1]?.children[col - 1]?.classList.add(
                "fa-solid",
                "fa-chess-knight"
            );

            i++;
        } else {
            clearInterval(intervalId);
        }
    }, 1000);
}

let dfsButton = document.querySelector(".dfs");
let bfsButton = document.querySelector(".bfs");
let hillClimbingButton = document.querySelector(".hill-climbing");

dfsButton.addEventListener("click", (event) => {
    console.log("started at 5,2");
    dfs(5, 2);
});

bfsButton.addEventListener("click", (event) => {
    console.log("started at 5,2");
    bfs(5, 2);
});

hillClimbingButton.addEventListener("click", (event) => {
    
    hillClimbing(5, 2, 2, 5).then((path) => {
        const movesList = document.getElementById("movesList");
        const finalPathList = document.getElementById("finalPathList");
        for(const step of path) {
            movesList.innerHTML += ` (${step.row},${step.col})\n <br> `
            finalPathList.innerHTML += ` (${step.row},${step.col})\n <br> `
        }
        console.log("Path:", path);
        visualizePath(path);
    });
})
