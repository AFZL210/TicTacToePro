import * as helper from './utils';

export const oneLayerBot = (marks) => {
    marks = helper.makeMarks(marks);
    let n = marks.lenght;
    let nextMoveIndex = helper.nextMoveIndex(marks);
    let newMarks = marks;
    newMarks[nextMoveIndex] = 'O';

    if(!helper.checkWin(newMarks)) return marks[nextMoveIndex];
    nextMoveIndex = helper.nextMoveIndex(marks);
    
    return marks[nextMoveIndex];
}