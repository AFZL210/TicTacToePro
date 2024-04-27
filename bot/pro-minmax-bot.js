import * as helper from './utils';

const minimax = (marks, isMaximizing, depth) => {
    let winner = helper.checkWin(marks);

    if (winner === '.' || winner === undefined) return 0;
    if (winner === 'O') return -1;
    if (winner === 'X') return 1;

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {
            if (marks[i] === '.') {
                marks[i] = 'X';
                let score = minimax(marks.slice(), false, depth + 1); // clone marks array
                marks[i] = '.';
                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;
    } else {
        let minScore = Infinity;

        for (let i = 0; i < 9; i++) {
            if (marks[i] === '.') {
                marks[i] = 'O';
                let score = minimax(marks.slice(), true, depth + 1);
                marks[i] = '.';
                minScore = Math.min(score, minScore);
            }
        }

        return minScore;
    }
}

export const minMaxBot = (marks) => {
    let bestScore = -Infinity;
    let move = 0;

    for (let i = 0; i < 9; i++) {
        if (marks[i] === '.') {
            marks[i] = 'O';
            let score = minimax(marks.slice(), true, 0);
            marks[i] = '.';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    return move;
}
