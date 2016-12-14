var game = new Chess();
var board = new ChessBoard('chessBoard', 'start');

var handleMove = function(source, target) {
    var move = game.move({from: source, to:target});
}


$('#startBtn').on('click', chessBoard.start);
$('#clearBtn').on('click', chessBoard.clear);
