const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

export const checkWin = (arr) => {
    let winner = '.';
    let winnerGrid = [];

    for (let i = 0; i < 8; i++) {
        let e = wins[i];
        let i1 = e[0], i2 = e[1], i3 = e[2];

        if (arr[i1] == arr[i2] && arr[i2] == arr[i3] && arr[i1] !== '.') {
            winner = arr[i1];
            winnerGrid = e;
        }
    }

    return { winner, winnerGrid };
}

export const genRand = (start, end) => {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

export const makeMarks = (marks) => {
    const newMarks = marks.map((element, index) => (element !== 'X' && element !== 'O') ? index : -1)
        .filter(index => index !== -1);
    return newMarks;
}

export const nextMoveIndex = (marks) => {
    let n = marks.length;
    let nextMoveIndex = genRand(0, n-1);

    return nextMoveIndex;
}