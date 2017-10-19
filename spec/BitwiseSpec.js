describe('Bitiwise', function() {

  var capitalize = function(word) {
    return word[0].toUpperCase() + word.slice(1);
  };
  
  var bitify = function(matrix) {
    return matrix.map(row => row.reduce((acc, space, index) => { return acc + space * (1 << index); }, 0));
  };
  
  describe('togglePiece', function() {
    it('toggles a piece', function() {
      var b = new Board({n: 3});
      b.togglePiece(1, 1);
      b.togglePiece(2, 1);
      b.togglePiece(2, 2);
      expect(b.get('b')[0]).to.equal(0);
      expect(b.get('b')[1]).to.equal(2);
      expect(b.get('b')[2]).to.equal(6);
    });
  });


  var verifyConflictTypes = function(expectedConflicts, matrix) {
    // The Board() constructor will accept a matrix and build that into a (Backbone) Board object (as defined in Board.js)
    var board = new Board({b: bitify(matrix)});
    _.map('row col majorDiagonal minorDiagonal queen'.split(' '), function(conflictType) {
      var conflictDetected = board['has' + capitalize(conflictType) + 'ConflictAt'](1, 1);
      var conflictExpected = _(expectedConflicts).contains(conflictType);
      var message = conflictExpected ? 'should' : 'should not';

      it(message + ' find a ' + conflictType + ' conflict', function() {
        expect(conflictDetected).to.be.equal(conflictExpected);
      });
    });
  };

  describe('Empty board', function() {
    verifyConflictTypes([], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with row conflicts', function() {
    verifyConflictTypes(['row', 'queen'], [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with col conflicts', function() {
    verifyConflictTypes(['col', 'rooks', 'queen'], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with major diagonal conflicts', function() {
    verifyConflictTypes(['majorDiagonal', 'queen'], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0]
    ]);

  });

  describe('Board with minor diagonal conflicts', function() {
    verifyConflictTypes(['minorDiagonal', 'queen'], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);

    verifyConflictTypes(['minorDiagonal', 'queen'], [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });
  
  describe('CNQS()', function() {

    it('finds the number of valid solutions for n of 0-8', function() {
      _.range(0, 9).map(function(n) {
        var solutionCount = CNQS(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92, 352, 724, 2680, 14200, 73712][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });
  
});