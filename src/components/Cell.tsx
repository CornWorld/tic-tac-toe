import {Component, createMemo} from 'solid-js';
import {Motion} from 'solid-motionone';
import {BoardCell as BoardCellType} from '../game/store';

interface CellProps {
	cell: BoardCellType;
	index: number;
	isSelected: boolean;
	onClick: (index: number) => void;
	onTouchStart: (e: TouchEvent) => void;
	onTouchEnd: (e: TouchEvent, index: number) => void;
}

const Cell: Component<CellProps> = (props) => {
	// Memoize the cell content to prevent unnecessary re-renders
	const cellContent = createMemo(() => props.cell);
	const isSelected = createMemo(() => props.isSelected);

	return (
		<div
			class={`
        w-full aspect-square
        border border-gray-600
        flex items-center justify-center 
        text-3xl sm:text-4xl font-bold 
        cursor-pointer 
        transition-all duration-200
        ${isSelected() ? 'bg-gray-700 ring-2 ring-blue-500' : ''}
        hover:bg-gray-700
        rounded-lg
      `}
			onClick={() => props.onClick(props.index)}
			onTouchStart={props.onTouchStart}
			onTouchEnd={(e) => props.onTouchEnd(e, props.index)}
		>
			<Motion
				initial={{scale: 0, rotate: -180}}
				animate={{scale: cellContent() ? 1 : 0, rotate: 0}}
				transition={{duration: 0.2, easing: "ease-out"}}
			>
        <span class={`
          ${cellContent() === 'X' ? 'text-blue-400' : 'text-red-400'}
          transition-colors duration-200
        `}>
          {cellContent()}
        </span>
			</Motion>
		</div>
	);
};

export default Cell;