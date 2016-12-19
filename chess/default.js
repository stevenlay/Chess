var board, game = new Chess();

var removeGreySquares = function() {
  $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d')=== true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};

var onDragStart = function(source, piece) {
    // if game is over or not your turn (black or white side)
    if (game.game_over() === true|| (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)){
            return false;
    }
};

var onDrop = function(source, target) {
    removeGreySquares();

    //snapback if not a valid move
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });
    if(!move === null) {
        return 'snapback';
    }
};

var onMouseoverSquare = function(square, piece) {
    var moves = games.moves({
        square: square,
        verbose: true
    });
    //if no moves available for the square, exit
    if (moves.length === 0) {
        return;
    }
    //highlight square
    greySquare(square);

    //highlight squares possible for movement
    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var handleMove = function(source, target) {
    var move = game.move({from: source, to:target, promotion:'q'});
    if (!move) {
        return 'snapback';
    }
};

var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

var onSnapEnd = function() {
    board.position(game.fen());
};

var cfg = {
    showNotation: false,
    draggable: true,
    position: 'start',
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onDragStart: onDragStart,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
};


board = new ChessBoard('board', cfg);

$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);
