var startGame = function() {
    var boardConfig = {
        draggable: true,
        dropOffBoard: "trash",
        sparePieces: true,
        onDrop: handleMove,
        position: "start"
    };

    var newBoard = new ChessBoard('board', boardConfig);
    var game = new Chess();
}

var moveHandler =function (source, target) {
    var move = game.move(
        {from: source, to: target}
        );
}