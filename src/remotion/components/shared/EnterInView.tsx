import { Direction } from '@/types/globals';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { TRANSITION_DURATION } from '../../constants';
import { Bubble } from './Bubble';

type Props = {
	children: React.ReactNode;
	title?: string;
	from: Direction;
};

export function EnterInView({ children, title, from }: Props) {
	const frame = useCurrentFrame();
	const { fps, width } = useVideoConfig();

	const spr = spring({
		fps,
		frame,
		config: { damping: 400 },
		durationInFrames: TRANSITION_DURATION,
	});

	const transforms: Record<Direction, string> = {
		top: `translateY(${interpolate(spr, [0, 1], [-width, 0])}px)`,
		bottom: `translateY(${interpolate(spr, [0, 1], [width, 0])}px)`,
		left: `translateX(${interpolate(spr, [0, 1], [-width, 0])}px)`,
		right: `translateX(${interpolate(spr, [0, 1], [width, 0])}px)`,
	};

	return (
		<AbsoluteFill
			className="justify-center items-center w-full text-2xl gap-12 m-auto font-bold"
			style={{
				transform: transforms[from],
			}}
		>
			{title?.trim() && (
				<Bubble>
					<h2 className="text-6xl">{title.trim()}</h2>
				</Bubble>
			)}
			{children}
		</AbsoluteFill>
	);
}
