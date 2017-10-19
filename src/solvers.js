/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  
  for (var i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }
  
  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  //easy way
  var fact = function(n) {
    if (n <= 1) {
      return 1;
    } else {
      return n * fact(n - 1);
    }
  };
  
  var solutionCount = fact(n); //fixme
  
  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  console.log(n);
  var solution = undefined;
  
  var board = new Board({n: n});

  var addNextQueen = function(row) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueenConflictsOn(row, col)) {
        if (row === n - 1) {
          return board.rows();
        } else {
          var sol = addNextQueen(row + 1);
          if (sol) {
            return sol;
          }
        }
      }
      board.togglePiece(row, col);
    }
  };
  
  solution = addNextQueen(0) || board.rows();
  


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  
  var board = new Board({n: n});
  var solutionCount = 0;
  var addNextQueen = function(row) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueenConflictsOn(row, col)) {
        if (row === n - 1) {
          solutionCount++;
        } else {
          addNextQueen(row + 1);
        }
      }
      board.togglePiece(row, col);
    }
  };
  
  addNextQueen(0);
  
  if (n === 0) {
    solutionCount = 1;
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
