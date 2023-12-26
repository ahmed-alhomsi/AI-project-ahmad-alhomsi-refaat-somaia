let board = [
    ["X", "X", "X", "X", "X", "X"],
    ["X", " ", " ", " ", " ", "X", " "],
    ["X", " ", "X", " ", " ", "G", " "],
    ["X", " ", " ", "X", " ", " ", " "],
    ["X", " ", " ", " ", "  ", " ", " "],
    ["X", " ", "S", " ", " ", " ", " "],
    ["X", "X", " ", " ", " ", "X", " "],
];

// Define possible knight moves
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

    // Loop through each row of the grid
    for (let row = 1; row < board.length; row++) {
        const currentRow = grid.children[row - 1];

        // Loop through each cell in the row
        for (let col = 1; col < board[row].length; col++) {
            const currentCell = currentRow.children[col - 1];

            // Update the content of the cell
            currentCell.classList.remove(
                "fa-solid",
                "fa-chess-knight",
                "fa-bullseye",
                "fa-ban"
            );

            if (board[row][col] === " ") {
                continue;
            }

            // Add the appropriate class based on the content
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

async function dfs(startRow, startCol) {
    const stack = [{ row: startRow, col: startCol }];
    const visited = new Set();
    const HorseGameGrid = document.querySelector(".grid");
    const delay = 1000;

    async function recursiveDFS() {
        if (stack.length === 0) {
            console.log("Path not found!");
            return false;
        }

        const { row, col } = stack[stack.length - 1];

        // Mark the current cell as visited
        visited.add(`${row}-${col}`);
        board[row][col] = ".";
        updateGrid();

        // Add a delay to visualize the process
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Loop through possible knight moves
        for (const [dr, dc] of knightMoves) {
            const newRow = row + dr;
            const newCol = col + dc;

            // If the goal is reached
            if (isMoveValid(newRow, newCol) && board[newRow][newCol] === "G") {
                console.log("Path found!");
                return true;
            }

            const newPosition = `${newRow}-${newCol}`;

            // If the move is valid and the cell is not visited
            if (
                isMoveValid(newRow, newCol) &&
                !visited.has(newPosition) &&
                board[newRow][newCol] === " "
            ) {
                // Mark the new cell as visited before recursively calling DFS
                visited.add(newPosition);

                // Clear knight from the previous cell
                HorseGameGrid.children[row - 1]?.children[col - 1]?.classList.remove(
                    "fa-solid",
                    "fa-chess-knight"
                );

                // Set the knight in the new cell
                board[newRow][newCol] = ".";
                stack.push({ row: newRow, col: newCol });

                // Show movement with delay
                HorseGameGrid.children[newRow - 1]?.children[newCol - 1]?.classList.add(
                    "fa-solid",
                    "fa-chess-knight"
                );

                console.log(`Move to (${newRow}, ${newCol})`);

                // Recursively call DFS for the new cell
                if (await recursiveDFS()) {
                    return true; // If a path is found, propagate the result upward
                }

                // Backtrack: Clear knight from the new cell
                HorseGameGrid.children[newRow - 1]?.children[newCol - 1]?.classList.remove(
                    "fa-solid",
                    "fa-chess-knight"
                );

                // Reset the cell to its original state
                board[newRow][newCol] = ".";
            }
        }

        // Backtrack: Clear knight from the current cell
        HorseGameGrid.children[row - 1]?.children[col - 1]?.classList.remove("fa-solid", "fa-chess-knight");

        // Reset the cell to its original state
        board[row][col] = " ";

        // Pop from the stack when there are no valid moves
        stack.pop();

        // Continue DFS with the next cell in the stack
        return await recursiveDFS();
    }

    // Start DFS from the initial position
    console.log(`started at ${startRow},${startCol}`);
    return await recursiveDFS();
}

async function bfs(startRow, startCol) {
    const queue = [{ row: startRow, col: startCol }];
    const visited = new Set();
    const HorseGameGrid = document.querySelector(".grid");
    const delay = 1000;

    while (queue.length > 0) {
        const { row, col } = queue.shift();

        // Mark the current cell as visited
        visited.add(`${row}-${col}`);
        board[row][col] = ".";
        updateGrid();

        for (const [dr, dc] of knightMoves) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (isMoveValid(newRow, newCol) && board[newRow][newCol] === "G") {
                console.log("Path found!");
                return true;
            }

            const newPosition = `${newRow}-${newCol}`;
            if (isMoveValid(newRow, newCol) && !visited.has(newPosition) && board[newRow][newCol] === " ") {
                // Mark the new cell as visited before pushing it into the queue
                visited.add(newPosition);
                board[newRow][newCol] = ".";
                queue.push({ row: newRow, col: newCol });

                // Show movement with delay
                HorseGameGrid.children[newRow - 1]?.children[newCol - 1]?.classList.add("fa-solid", "fa-chess-knight");
                await new Promise((resolve) => setTimeout(resolve, delay));

                console.log(`Move to (${newRow}, ${newCol})`);
            }
        }

        // Reset the cell to its original state
        board[row][col] = " ";
        updateGrid();

        // Add a delay here to visualize the process
        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    console.log("Path not found!");
    return false;
}

// Function to update the grid based on the path
async function visualizePath(path) {
    const HorseGameGrid = document.querySelector(".grid");

    for (let i = 0; i < path.length; i++) {
        const { row, col } = path[i];

        // Clear knight from the previous cell
        HorseGameGrid.children[row - 1]?.children[col - 1]?.classList.remove(
            "fa-solid",
            "fa-chess-knight"
        );

        // Set the knight in the new cell
        board[row][col] = ".";
        updateGrid();

        // Show movement with delay
        HorseGameGrid.children[row - 1]?.children[col - 1]?.classList.add(
            "fa-solid",
            "fa-chess-knight"
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
}

function ucs(startRow, startCol, goalRow, goalCol) {
    const priorityQueue = new PriorityQueue(); // Implement a priority queue to store states

    const startState = {
        row: startRow,
        col: startCol,
        cost: 0,
        path: [],
    };

    priorityQueue.enqueue(startState, 0);

    const visited = new Set();

    let path = []; // Declare the path variable here

    while (!priorityQueue.isEmpty()) {
        const currentState = priorityQueue.dequeue();
        const { row, col, cost, path: currentPath } = currentState;

        if (row === goalRow && col === goalCol) {
            console.log("Path found!");
            path = currentPath.concat([{ row, col }]); // Update the path variable

            // Visualize the path
            visualizePath(path);

            return path; // Return the path including the goal position
        }

        const currentPosition = `${row}-${col}`;

        if (visited.has(currentPosition)) {
            continue;
        }

        visited.add(currentPosition);

        for (const [dr, dc] of knightMoves) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (isMoveValid(newRow, newCol) && board[newRow][newCol] !== "S") {
                const newPosition = `${newRow}-${newCol}`;
                const newCost = cost + euclideanDistance(row, col, newRow, newCol);

                const newState = {
                    row: newRow,
                    col: newCol,
                    cost: newCost,
                    path: [...currentPath, { row, col }],
                };

                priorityQueue.enqueue(newState, newCost);
            }
        }
    }

    console.log("Path not found!");
    return path; // Return the path (might be an empty array)
}

// Define the Euclidean distance function
function euclideanDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Priority Queue implementation
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sortQueue();
    }

    dequeue() {
        return this.queue.shift().element;
    }

    sortQueue() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}



let dfsButton = document.querySelector(".dfs");
let bfsButton = document.querySelector(".bfs");
let ucsButton = document.querySelector(".ucs");

dfsButton.addEventListener("click", (event) => {
    console.log("started at 5,2");
    dfs(5, 2);
});

bfsButton.addEventListener("click", (event) => {
    console.log("started at 5,2");
    bfs(5, 2);
});

// UCS button event listener
ucsButton.addEventListener("click", (event) => {
    console.log("started UCS at position (5,2)");
    const path = ucs(5, 2, 2, 5);
    
    if (path.length > 0) {
        console.log("Path:", path);
        // Print each step in the path
        path.forEach((step, index) => {
            console.log(`Step ${index + 1}: (${step.row}, ${step.col})`);
        });
    } else {
        console.log("No path found.");
    }
});
