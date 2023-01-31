import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DURATION_IN_FRAMES } from '../constants';

type Props = {
	children: React.ReactNode;
};

export function CompositionLayout({ children }: Props) {
	const frame = useCurrentFrame();
	const { height, fps } = useVideoConfig();

	const entrance = spring({
		fps,
		frame,
		config: {
			damping: 300,
		},
		durationInFrames: 10,
	});

	const entranceOffset = interpolate(entrance, [0, 1], [height, 0]);

	const wave1 = Math.cos(frame / 15) * 10 + entranceOffset;

	const PROGRESS = (frame / DURATION_IN_FRAMES) * 9;

	const opacity =
		interpolate(frame, [20, 40], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}) / 0.8;

	return (
		<div
			className="flex flex-col justify-center items-center w-full text-2xl gap-12 m-auto font-bold transition-transform duration-1000 ease-out"
			style={{
				transition: 'opacity .3 ease',
				opacity: PROGRESS > 1.5 ? Math.asinh(PROGRESS) : opacity,
				transform:
					`translateY(${wave1}px)
        ` +
					(PROGRESS > 1.6
						? `translateX(-${200}%)`
						: PROGRESS > 1.5
						? `translateX(${10}%)`
						: ''),
			}}
		>
			{children}
		</div>
	);
}
