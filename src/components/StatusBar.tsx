import {Component} from 'solid-js';
import {Motion} from 'solid-motionone';
import {Player, Status} from '../game/store';

interface StatusBarProps {
	status: Status;
	currentPlayer: Player;
	hasWon: boolean;
}

const StatusBar: Component<StatusBarProps> = (props) => {
	return (
		<Motion
			initial={{opacity: 0, y: -20}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.3}}
			class="text-center"
		>
			{props.status === 'on-going' && (
				<div class="bg-gray-800 px-6 py-3 rounded-lg">
					<p class="text-2xl">
						Current Player: <span class={props.currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'}>
              {props.currentPlayer}
            </span>
					</p>
				</div>
			)}
			{props.status === 'finished' && (
				<Motion
					initial={{scale: 0.9, opacity: 0}}
					animate={{scale: 1, opacity: 1}}
					class="bg-gray-800 px-8 py-4 rounded-lg shadow-lg"
				>
					{props.hasWon ? (
						<div class="space-y-2">
							<p class="text-3xl font-bold text-green-400">Winner!</p>
							<p class="text-xl">
								Player <span class={props.currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'}>
                  {props.currentPlayer}
                </span> has won the game
							</p>
						</div>
					) : (
						<div class="space-y-2">
							<p class="text-3xl font-bold text-yellow-400">Draw!</p>
							<p class="text-xl">The game ended in a tie</p>
						</div>
					)}
				</Motion>
			)}
		</Motion>
	);
};

export default StatusBar;