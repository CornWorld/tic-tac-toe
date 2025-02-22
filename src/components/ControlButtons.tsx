import {Component} from 'solid-js';
import {Motion} from 'solid-motionone';

interface ControlButtonsProps {
	onNewGame: () => void;
	isGameFinished: boolean;
}

const ControlButtons: Component<ControlButtonsProps> = (props) => {
	return (
		<div class="flex gap-4">
			<Motion
				animate={props.isGameFinished ? {scale: 1.1} : {scale: 1}}
				transition={{duration: 0.3}}
			>
				<button
					class={`
            px-8 py-3 bg-blue-500 text-white rounded-lg 
            hover:bg-blue-600 transition-all
            ${props.isGameFinished ? 'ring-4 ring-blue-400 ring-opacity-50' : ''}
          `}
					onClick={props.onNewGame}
				>
					New Game
				</button>
			</Motion>
		</div>
	);
};

export default ControlButtons; 