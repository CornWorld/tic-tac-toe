import {Component} from 'solid-js';
import {Motion} from 'solid-motionone';

const KeyboardTip: Component = () => {
	return (
		<Motion
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.3}}
		>
			<div class="bg-gray-800 p-4 rounded-lg shadow-lg text-sm text-gray-300 mt-4">
				<h3 class="text-blue-400 font-semibold mb-2">Keyboard Controls:</h3>
				<ul class="space-y-1">
					<li>
						<span class="text-blue-300">↑↓←→</span> Arrow keys to navigate
					</li>
					<li>
						<span class="text-blue-300">Enter</span> or <span class="text-blue-300">Space</span> to place piece
					</li>
					<li>
						<span class="text-blue-300">Esc</span> to cancel selection
					</li>
				</ul>
			</div>
		</Motion>
	);
};

export default KeyboardTip; 