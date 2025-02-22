import {Component, createSignal, onMount, Show} from 'solid-js';
import {Motion} from "solid-motionone";
import {createGameStore, Difficulty, GameMode, Player} from "./game/store";
import Setup from './components/Setup';
import StatusBar from './components/StatusBar';
import Board from './components/Board';
import ControlButtons from './components/ControlButtons';
import MobileInstructions from './components/MobileInstructions';
import KeyboardTip from './components/KeyboardTip';

const App: Component = () => {
	const game = createGameStore();
	const [showSetup, setShowSetup] = createSignal(true);
	const [touchStart, setTouchStart] = createSignal<{ x: number; y: number } | null>(null);

	onMount(() => {
		if('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/serviceWorker.js');
		}

		window.addEventListener('keydown', game.handleKeyPress);
		return () => window.removeEventListener('keydown', game.handleKeyPress);
	});

	const handleTouchStart = (e: TouchEvent) => {
		setTouchStart({
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		});
	};

	const handleTouchEnd = (e: TouchEvent, index: number) => {
		if(!touchStart()) return;

		const deltaX = e.changedTouches[0].clientX - touchStart()!.x;
		const deltaY = e.changedTouches[0].clientY - touchStart()!.y;

		if(Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
			handleCellClick(index);
		}

		setTouchStart(null);
	};

	const handleCellClick = (index: number) => {
		if(game.status !== 'on-going') return;
		game.placePiece(index, game.currentPlayer);
	};

	const handleGameStart = (settings: { mode: GameMode; difficulty: Difficulty; currentPlayer: Player }) => {
		game.startGame(settings);
		setShowSetup(false);
	};

	const handleNewGame = () => {
		game.resetGame();
		setShowSetup(true);
	};

	return (
		<div
			class="min-h-screen bg-gray-900 text-white py-6 flex flex-col justify-start items-center px-4 sm:px-6 lg:px-8">
			<h1 class="text-4xl sm:text-5xl font-bold text-blue-400 text-center py-6 sm:py-8">Tic Tac Toe</h1>

			<Show
				when={showSetup()}
				fallback={
					<Motion
						initial={{opacity: 0, scale: 0.9}}
						animate={{opacity: 1, scale: 1}}
						transition={{duration: 0.3}}
						class="w-full max-w-2xl"
					>
						<div class="flex flex-col items-center space-y-6">
							<StatusBar
								status={game.status}
								currentPlayer={game.currentPlayer}
								hasWon={game.checkWon(game.currentPlayer)}
							/>

							<Board
								board={game.board}
								selectedCell={game.selectedCell}
								onCellClick={handleCellClick}
								onTouchStart={handleTouchStart}
								onTouchEnd={handleTouchEnd}
							/>

							<KeyboardTip />

							<ControlButtons
								onNewGame={handleNewGame}
								isGameFinished={game.status === 'finished'}
							/>

							<MobileInstructions/>
						</div>
					</Motion>
				}
			>
				<Setup onStart={handleGameStart}/>
			</Show>
		</div>
	);
};

export default App;