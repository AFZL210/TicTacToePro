import * as helper from './utils';

export const randomBot = (marks) => {
    marks = helper.makeMarks(marks);
    let n = marks.lenght;
    let nextMoveIndex = helper.nextMoveIndex(marks);

    return marks[nextMoveIndex];
}