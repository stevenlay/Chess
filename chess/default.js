var startGame = function () {
    var boardCFG = {
        draggable: true,
        position: 'start',
        onDrop: handleMove,
    };

    game = new Chess();
    var board = new ChessBoard('board');

}
