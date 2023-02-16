import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

type Props = {
	ondulation: number;
};

export function useWave({ ondulation }: Props) {
	const frame = useCurrentFrame();
	const { fps, height } = useVideoConfig();
	const entrance = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
		durationInFrames: 30,
	});

	const entranceOffset = interpolate(entrance, [0, 1], [height, 0]);

	const wave = Math.cos(frame / ondulation) * 10 + entranceOffset;

	return wave;
}
