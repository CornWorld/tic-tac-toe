import {createStore} from 'solid-js/store';
import {getAiMove} from "./ai";
import {cloneDeep} from "lodash";

export type ChessPiece = 'X' | 'O';
export type Player = ChessPiece;
export type BoardCell = ChessPiece | '';
export type Status = 'waiting' | 'on-going' | 'finished';
export type GameMode = 'two-player' | 'ai';
export type Difficulty = 'simple' | 'hard';

export type GameState = {
	board: BoardCell[];
	currentPlayer: Player;
	status: Status;
	mode: GameMode;
	aiPlayer: Player;
	aiDifficulty: Difficulty;
};

export interface StartGameProps {
	mode: GameMode;
	difficulty: Difficulty;
	currentPlayer: Player;
}

interface GameStore extends GameState {
	placePiece: (pos: number, player: Player) => void;
	switchPlayer: () => void;
	checkDraw: () => boolean;
	checkWon: (player: Player) => boolean;
	resetGame: () => void;
	makeAiMove: () => void;
	startGame: (props: StartGameProps) => void;
	getBoard: () => BoardCell[][];
	handleKeyPress: (e: KeyboardEvent) => void;
	selectedCell: number;
	setSelectedCell: (index: number) => void;
}

export const revPiece = (piece: ChessPiece): ChessPiece => piece === 'X' ? 'O' : 'X';

const defaultState: GameState = {
	board: new Array(9).fill(''),
	currentPlayer: 'X',
	status: 'waiting',
	mode: 'two-player',
	aiPlayer: 'O',
	aiDifficulty: 'simple',
}

export const lineCombinations = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
	[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
	[0, 4, 8], [2, 4, 6]             // Diagonals
];

const createGameStore = () => {
	const [gameState, setGameState] = createStore<GameStore>({
		...defaultState,
		selectedCell: -1,
		placePiece: (pos, player) => {
			setGameState('board', pos, player);

			if(gameState.checkWon(player) || gameState.checkDraw()) {
				setGameState('status', 'finished');
				return;
			}

			gameState.switchPlayer();
			if(gameState.mode === 'ai' && gameState.currentPlayer === gameState.aiPlayer) {
				gameState.makeAiMove();
			}
		},
		switchPlayer: () => {
			setGameState('currentPlayer', revPiece);
		},
		checkWon: (player: Player): boolean => {
			return lineCombinations.some(line => line.every(cell => gameState.board[cell] === player));
		},
		checkDraw: (): boolean => {
			return gameState.board.every(cell => cell !== '') && !gameState.checkWon('X') && !gameState.checkWon('O');
		},
		resetGame: () => {
			setGameState(cloneDeep(defaultState));
		},
		makeAiMove: () => {
			const move = getAiMove(gameState);
			if(move !== null) {
				gameState.placePiece(move, gameState.aiPlayer);
			}
		},
		startGame: (props: StartGameProps) => {
			setGameState({
				...cloneDeep(defaultState),
				mode: props.mode,
				aiDifficulty: props.difficulty,
				currentPlayer: 'X' as const,
				aiPlayer: revPiece(props.currentPlayer),
				status: 'on-going' as const,
			});
			if(props.currentPlayer === 'O' && props.mode === 'ai') {
				gameState.makeAiMove();
			}
		},
		getBoard: () => {
			const board = gameState.board;
			const res: BoardCell[][] = [];
			for (let i = 0; i < 3; i++) {
				res.push(board.slice(i * 3, i * 3 + 3));
			}
			return res;
		},
		setSelectedCell: (index: number) => {
			if(index >= 0 && index < 9) {
				setGameState('selectedCell', index);
			}
		},
		handleKeyPress: (e: KeyboardEvent) => {
			if(gameState.status !== 'on-going') return;

			switch (e.key) {
			case 'ArrowRight':
				gameState.setSelectedCell((gameState.selectedCell + 1) % 9);
				break;
			case 'ArrowLeft':
				gameState.setSelectedCell((gameState.selectedCell - 1 + 9) % 9);
				break;
			case 'ArrowUp':
				gameState.setSelectedCell((gameState.selectedCell - 3 + 9) % 9);
				break;
			case 'ArrowDown':
				gameState.setSelectedCell((gameState.selectedCell + 3) % 9);
				break;
			case 'Enter':
			case ' ':
				if(gameState.selectedCell !== -1) {
					gameState.placePiece(gameState.selectedCell, gameState.currentPlayer);
				}
				break;
			}
		}
	});
	return gameState;
}

export {createGameStore};