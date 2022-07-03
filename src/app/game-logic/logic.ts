export function calculateWinner(matrix: any, row: any, col: any) {
  try {
    let winLen = 3;
    if (matrix[0].length >= 5 && matrix.length >= 5) {
      winLen = 5;
    }

    const res =
      checkCol(matrix, winLen, row, col) ||
      checkRow(matrix, winLen, row, col) ||
      checkMainDiagonal(matrix, winLen, row, col) ||
      checkAuxiliaryDiagonal(matrix, winLen, row, col) ||
      null;

    return res;
  } catch (error) {
    return null;
  }
}

export function checkDraw(matrix: any) {
  if (matrix.length === 0) {
    return false;
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

function checkRow(matrix: any, winLen: any, row: any, col: any) {
  if (row !== null && col !== null) {
    let value = matrix[row][col];
    if (value === null) {
      return null;
    }
    let result = [];

    for (let i = 0; i < matrix[0].length; i++) {
      if (matrix[row][i] === value) {
        result.push({
          row: row,
          col: i,
        });
      } else {
        if (
          result.length >= winLen &&
          !checkBlockRow(
            matrix,
            result[0].col,
            result[result.length - 1].col,
            row
          )
        ) {
          return { position: result, player: value };
        }
        result = [];
      }
    }
    if (result.length >= winLen) {
      return { position: result, player: value };
    }
  }

  return null;
}

function checkCol(matrix: any, winLen: any, row: any, col: any) {
  if (row !== null && col !== null) {
    let value = matrix[row][col];
    if (value === null) {
      return null;
    }

    let result = [];
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][col] === value) {
        result.push({
          row: i,
          col: col,
        });
      } else {
        if (
          result.length >= winLen &&
          !checkBlockCol(
            matrix,
            result[0].row,
            result[result.length - 1].row,
            col
          )
        ) {
          return { position: result, player: value };
        }
        result = [];
      }
    }
    if (result.length >= winLen) {
      return { position: result, player: value };
    }
  }
  return null;
}

function checkMainDiagonal(matrix: any, winLen: any, row: any, col: any) {
  if (row !== null && col !== null) {
    let startRow = row;
    let startCol = col;
    while (startRow && startCol) {
      startRow--;
      startCol--;
    }

    let value = matrix[row][col];
    if (value === null) {
      return null;
    }

    let result = [];

    while (startRow < matrix.length) {
      if (matrix[startRow][startCol] === value) {
        result.push({
          row: startRow,
          col: startCol,
        });
      } else {
        let idx = result.length - 1;

        if (
          result.length >= winLen &&
          !checkBlockDiagonal(
            matrix,
            result[0].row,
            result[idx].row,
            result[0].col,
            result[idx].col,
            true
          )
        ) {
          return { position: result, player: value };
        }
        result = [];
      }
      startRow++;
      startCol++;
    }

    if (result.length >= winLen) {
      return { position: result, player: value };
    }
    return null;
  }
  return null;
}

function checkAuxiliaryDiagonal(matrix: any, winLen: any, row: any, col: any) {
  if (row !== null && col !== null) {
    let startRow = row;
    let startCol = col;
    while (startRow < matrix.length - 1 && startCol) {
      startRow++;
      startCol--;
    }
    let value = matrix[row][col];
    if (value === null) {
      return null;
    }
    let result = [];

    while (startRow >= 0) {
      if (matrix[startRow][startCol] === value) {
        result.push({
          row: startRow,
          col: startCol,
        });
      } else {
        const idx = result.length - 1;
        if (
          result.length >= winLen &&
          !checkBlockDiagonal(
            matrix,
            result[0].row,
            result[idx].row,
            result[0].col,
            result[idx].col,
            false
          )
        ) {
          return { position: result, player: value };
        }
        result = [];
      }
      startRow--;
      startCol++;
    }
    if (result.length >= winLen) {
      return { position: result, player: value };
    }
    return null;
  }
  return null;
}

function checkBlockRow(matrix: any, startCol: any, endCol: any, row: any) {
  return matrix[row][startCol - 1] && matrix[row][endCol + 1];
}

function checkBlockCol(matrix: any, startRow: any, endRow: any, col: any) {
  if (startRow) {
    return matrix[startRow - 1][col] && matrix[endRow + 1][col];
  }
  return false;
}

function checkBlockDiagonal(
  matrix: any,
  startRow: any,
  endRow: any,
  startCol: any,
  endCol: any,
  isMain: any
) {
  if (startCol && startRow) {
    if (isMain) {
      return (
        matrix[startRow - 1][startCol - 1] && matrix[endRow + 1][endCol + 1]
      );
    } else
      return (
        matrix[startRow + 1][startCol - 1] && matrix[endRow - 1][endCol + 1]
      );
  }
  return false;
}
