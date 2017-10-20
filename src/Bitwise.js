(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set('b', (new Array(this.get('n')).fill(0)));
      } else {
        this.set('n', params.length);
      }
    },

    togglePiece: function(r, c) {
      this.get('b')[r] ^= (1 << c);
    },

    hasQueenConflictAt: function(r, c) {
      return this.hasRowConflictAt(r, c) || this.hasColConflictAt(r, c) || this.hasMajorDiagonalConflictAt(r, c) || this.hasMinorDiagonalConflictAt(r, c);
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(r, c) {
      return this.get('b')[r] !== 0;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(r, c) {
      console.log('hello');
      return Boolean(this.get('b').reduce((acc, row) => {
        return acc + row & (1 << c);
      }));
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(r, c) {
      return Boolean(this.get('b').reduce((acc, row, i) => acc + (row & (1 << (c - r + i))), 0));
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(r, c) {
      return Boolean(this.get('b').reduce((acc, row, i) => acc + (row & (1 << (c + r - i))), 0));
    },

    // test if any minor diagonals on this board contain conflicts

    /*--------------------  End of Helper Functions  ---------------------*/


  });

}());


window.CNQS = n => {
  
  b = Array(n).fill(0);
  s = n == 0 ? 1 : 0;
  q = r => {
    var c = -1;
    while (++c < n) {
      var m = 1 << c;
      b.some((R, i) => R & (m | 1 << c - r + i | 1 << c + r - i)) ? 0 : (
        b[r] ^= m,
        r == n - 1 ? s++ : q(r + 1),
        b[r] ^= m
      );
    }
  };
  
  q(0);

  return s;
};