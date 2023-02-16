import { Direction, HideDirection } from '@/types/globals';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { TRANSITION_DURATION } from '../../constants';
import { EnterInView } from './EnterInView';

type Props = {
	children: React.ReactNode;
	title?: string;
	to: HideDirection;
};

export function CompositionLayout({ children, title, to }: Props) {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width } = useVideoConfig();

	const spr = spring({
		fps,
		frame: frame - (durationInFrames - TRANSITION_DURATION),
		config: { damping: 200 },
		durationInFrames: TRANSITION_DURATION,
	});

	const transforms: Record<Direction, string> = {
		top: `translateY(${interpolate(spr, [0, 1], [0, -width])}px)`,
		bottom: `translateY(${interpolate(spr, [0, 1], [0, width])}px)`,
		left: `translateX(${interpolate(spr, [0, 1], [0, -width])}px)`,
		right: `translateX(${interpolate(spr, [0, 1], [0, width])}px)`,
	};

	return (
		<AbsoluteFill
			style={{
				transform: transforms[to],
			}}
		>
			<EnterInView from="right" title={title}>
				{children}
			</EnterInView>
		</AbsoluteFill>
	);
}
