var cfg = {
    showNotation: false,
    draggable: true,
    position: 'start',
    onDrop: handleMove,
};


var game = new Chess();
var board = new ChessBoard('board', cfg);

var handleMove = function(source, target) {
    var move = game.move({from: source, to:target});
};

$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);
