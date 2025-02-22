import {Component} from 'solid-js';

const MobileInstructions: Component = () => {
	return (
		<div class="mt-6 text-sm text-gray-400 text-center md:hidden">
			<p>Use arrow keys or touch to play</p>
			<p>Tap to place your mark</p>
		</div>
	);
};

export default MobileInstructions; 