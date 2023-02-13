import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { TRANSITION_DURATION } from '../constants';
import { EnterInView } from './EnterInView';

type Props = {
	children: React.ReactNode;
};

export function CompositionLayout({ children }: Props) {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width } = useVideoConfig();

	const spr = spring({
		fps,
		frame: frame - (durationInFrames - TRANSITION_DURATION),
		config: { damping: 200 },
		durationInFrames: TRANSITION_DURATION,
	});

	return (
		<AbsoluteFill
			style={{
				transform: `translateX(${interpolate(spr, [0, 1], [0, -width])}px)`,
			}}
		>
			<EnterInView>{children}</EnterInView>
		</AbsoluteFill>
	);
}
