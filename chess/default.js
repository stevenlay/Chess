var board, game = new Chess();

var greySquare = function(square) {

    //gets board element at particular square
    var squareEl = $('#board .square-' + square);
    var background = '#a9a9a9';

    //  if square element has a piece, turn background
    if (squareEl.hasClass('black-3c85d')) {
        background = '#696969';
    }
    squareEl.css('background', background);
};

//removes the background style from background of a squareEl
var removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
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
    var move = handleMove(source, target);
};

var onMouseoverSquare = function(square, piece) {
    var moves = game .moves({
        square: square,
        verbose: true
    });
    //if number of moves available = 0, break
    if (!moves.length) {
        return;
    }
    //highlight square if moves > 0
    greySquare(square);

    //highlight squares possible for movement
    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var handleMove = function(source, target) {
    var move = game.move({from: source, to:target, promotion:'q'});
    socket.emit('move', move);
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
$(window).resize(board.resize);

$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);

// setup my socket client
var socket = io();

socket.on('move', function(msg) {
    game.move(msg);
    board.position(game.fen());
});
