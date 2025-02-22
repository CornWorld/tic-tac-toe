import {BoardCell, GameState, lineCombinations, Player, revPiece} from './store'; // Adjust import path as needed

// Check if a player has won
function hasWon(board: BoardCell[], player: Player): boolean {
	return lineCombinations.some(combo =>
		combo.every(index => board[index] === player)
	);
}

// Check if the game is a draw
function isDraw(board: BoardCell[]): boolean {
	return board.every(cell => cell !== '') && !hasWon(board, 'X') && !hasWon(board, 'O');
}

function minimax(board: BoardCell[], currentPlayer: Player, aiPlayer: Player): number {
	if(hasWon(board, aiPlayer)) return 1;
	if(hasWon(board, revPiece(aiPlayer))) return -1;
	if(isDraw(board)) return 0;

	const emptyCells = board
		.map((cell, index) => cell === '' ? index : -1)
		.filter(index => index !== -1);

	if(currentPlayer === aiPlayer) {
		// Maximizing player
		let bestScore = Number.NEGATIVE_INFINITY;
		for (const index of emptyCells) {
			const newBoard = board.slice();
			newBoard[index] = currentPlayer;
			const score = minimax(newBoard, revPiece(currentPlayer), aiPlayer);
			bestScore = Math.max(bestScore, score);
		}
		return bestScore;
	} else {
		// Minimizing player
		let bestScore = Number.POSITIVE_INFINITY;
		for (const index of emptyCells) {
			const newBoard = board.slice();
			newBoard[index] = currentPlayer;
			const score = minimax(newBoard, revPiece(currentPlayer), aiPlayer);
			bestScore = Math.min(bestScore, score);
		}
		return bestScore;
	}
}

function getSimpleAiMove(board: BoardCell[]): number | null {
	// Try to win if possible
	const winningMove = findWinningMove(board, 'O');
	if(winningMove !== null) return winningMove;

	// Block opponent's winning move
	const blockingMove = findWinningMove(board, 'X');
	if(blockingMove !== null) return blockingMove;

	// Take center if available
	if(board[4] === '') return 4;

	// Take corners randomly
	const corners = [0, 2, 6, 8].filter(i => board[i] === '');
	if(corners.length > 0) {
		return corners[Math.floor(Math.random() * corners.length)];
	}

	// Take any available edge
	const edges = [1, 3, 5, 7].filter(i => board[i] === '');
	if(edges.length > 0) {
		return edges[Math.floor(Math.random() * edges.length)];
	}

	return null;
}

function findWinningMove(board: BoardCell[], player: Player): number | null {
	for (let i = 0; i < board.length; i++) {
		if(board[i] === '') {
			const testBoard = [...board];
			testBoard[i] = player;
			if(hasWon(testBoard, player)) {
				return i;
			}
		}
	}
	return null;
}

export function getAiMove(state: GameState): number | null {
	const {board, currentPlayer, status, aiPlayer, aiDifficulty} = state;

	if(status !== 'on-going' || currentPlayer !== aiPlayer) {
		return null;
	}

	if(aiDifficulty === 'simple') {
		return getSimpleAiMove(board);
	} else if(aiDifficulty === 'hard') { // Use minimax algorithm
		let bestMove = -1;
		let bestScore = Number.NEGATIVE_INFINITY;

		const emptyCells = board
			.map((cell, index) => cell === '' ? index : -1)
			.filter(index => index !== -1);

		for (const index of emptyCells) {
			const newBoard = board.slice();
			newBoard[index] = aiPlayer;
			const score = minimax(newBoard, revPiece(aiPlayer), aiPlayer);
			if(score > bestScore) {
				bestScore = score;
				bestMove = index;
			}
		}
		return bestMove !== -1 ? bestMove : null;
	}
}