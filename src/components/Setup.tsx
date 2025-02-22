import {Component, createSignal} from 'solid-js';
import {Motion} from 'solid-motionone';
import {Difficulty, GameMode, Player, StartGameProps} from '../game/store';

interface SetupProps {
	onStart: (settings: StartGameProps) => void;
}

const setupDefaultValue = {
	mode: 'ai' as GameMode,
	difficulty: 'simple' as Difficulty,
	player: 'X' as Player
}

const Setup: Component<SetupProps> = (props) => {
	const [selectedMode, setSelectedMode] = createSignal<GameMode>(setupDefaultValue.mode);
	const [selectedDifficulty, setSelectedDifficulty] = createSignal<Difficulty>(setupDefaultValue.difficulty);
	const [selectedPlayer, setSelectedPlayer] = createSignal<Player>(setupDefaultValue.player);

	const handleStart = () => {
		props.onStart({
			mode: selectedMode(),
			difficulty: selectedDifficulty(),
			currentPlayer: selectedPlayer()
		});
	};

	return (
		<Motion
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.3}}
			class="w-full max-w-2xl"
		>
			<div class="p-6 bg-gray-800 rounded-xl shadow-2xl">
				<h2 class="text-2xl font-semibold text-blue-400 mb-6">Game Setup</h2>

				<div class="space-y-6">
					<div class="space-y-2">
						<label class="block text-sm font-medium text-gray-300">Game Mode</label>
						<div class="flex gap-4">
							<button
								class={`flex-1 py-2 px-4 rounded-lg transition-all ${
									selectedMode() === 'two-player'
										? 'bg-blue-600 text-white'
										: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
								}`}
								onClick={() => setSelectedMode('two-player')}
							>
								Two Player
							</button>
							<button
								class={`flex-1 py-2 px-4 rounded-lg transition-all ${
									selectedMode() === 'ai'
										? 'bg-blue-600 text-white'
										: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
								}`}
								onClick={() => setSelectedMode('ai')}
							>
								VS AI
							</button>
						</div>
					</div>

					{selectedMode() === 'ai' && (
						<>
							<div class="space-y-2">
								<label class="block text-sm font-medium text-gray-300">Difficulty</label>
								<div class="flex gap-4">
									<button
										class={`flex-1 py-2 px-4 rounded-lg transition-all ${
											selectedDifficulty() === 'simple'
												? 'bg-blue-600 text-white'
												: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
										}`}
										onClick={() => setSelectedDifficulty('simple')}
									>
										Simple
									</button>
									<button
										class={`flex-1 py-2 px-4 rounded-lg transition-all ${
											selectedDifficulty() === 'hard'
												? 'bg-blue-600 text-white'
												: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
										}`}
										onClick={() => setSelectedDifficulty('hard')}
									>
										Hard
									</button>
								</div>
							</div>

							<div class="space-y-2">
								<label class="block text-sm font-medium text-gray-300">Your Piece</label>
								<div class="flex gap-4">
									<button
										class={`flex-1 py-2 px-4 rounded-lg transition-all ${
											selectedPlayer() === 'X'
												? 'bg-blue-600 text-white'
												: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
										}`}
										onClick={() => setSelectedPlayer('X')}
									>
										X
									</button>
									<button
										class={`flex-1 py-2 px-4 rounded-lg transition-all ${
											selectedPlayer() === 'O'
												? 'bg-blue-600 text-white'
												: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
										}`}
										onClick={() => setSelectedPlayer('O')}
									>
										O
									</button>
								</div>
							</div>
						</>
					)}

					<button
						class="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
						onClick={handleStart}
					>
						Start Game
					</button>
				</div>
			</div>
		</Motion>
	);
};

export default Setup;