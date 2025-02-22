import {Component, For} from 'solid-js';
import {Motion} from 'solid-motionone';
import {BoardCell as BoardCellType} from '../game/store';
import Cell from './Cell';

interface BoardProps {
	board: BoardCellType[];
	selectedCell: number;
	onCellClick: (index: number) => void;
	onTouchStart: (e: TouchEvent) => void;
	onTouchEnd: (e: TouchEvent, index: number) => void;
}

const Board: Component<BoardProps> = (props) => {
	return (
		<div class="bg-gray-800 p-4 rounded-xl shadow-2xl w-full max-w-md">
			<div class="grid grid-cols-3 gap-3">
				<For each={props.board}>
					{(cell, index) => (
						<Motion
							initial={{scale: 0, opacity: 0}}
							animate={{scale: 1, opacity: 1}}
							transition={{duration: 0.2, delay: index() * 0.05}}
						>
							<Cell
								cell={cell}
								index={index()}
								isSelected={props.selectedCell === index()}
								onClick={props.onCellClick}
								onTouchStart={props.onTouchStart}
								onTouchEnd={props.onTouchEnd}
							/>
						</Motion>
					)}
				</For>
			</div>
		</div>
	);
};

export default Board;