import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { TRANSITION_DURATION } from '../constants';

type Props = {
	children: React.ReactNode;
};

export function EnterInView({ children }: Props) {
	const frame = useCurrentFrame();
	const { fps, width } = useVideoConfig();

	const spr = spring({
		fps,
		frame,
		config: { damping: 400 },
		durationInFrames: TRANSITION_DURATION,
	});

	return (
		<AbsoluteFill
			className="justify-center items-center w-full text-2xl gap-12 m-auto font-bold"
			style={{
				transform: `translateX(${interpolate(spr, [0, 1], [width, 0])}px)`,
			}}
		>
			{children}
		</AbsoluteFill>
	);
}
