var cfg = {
    showNotation: false,
    draggable: true,
    position: 'start',
    onDrop: onDrop,
    onMouseoverSquare: onMouseoutSquare,
    onSnapEnd: onSnapEnd,
    onDragStart: onDragStart
};


var game = new Chess();
var board = new ChessBoard('board', cfg);


var removeGreySquares = function() {
  $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d')) {
        background = '#696969'
    }

    squareEl.css('background', background);
};

var onDragStart = function(source, piece) {
    // if game is over or not your turn (black or white side)
    if (game.game_over() || (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)){
            return false;
    }
};

var onDrop = function(source, target) {
    removeGreySquares();

    //snapback if not a valid move
    var move = handleMove(source,target);
    if(!move) {
        return 'snapback';
    }
};

var handleMove = function(source, target) {
    var move = game.move({from: source, to:target});
};

var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

var onSnapEnd = function() {
    board.position(game.fen());
};

$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);
