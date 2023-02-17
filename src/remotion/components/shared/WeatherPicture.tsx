import { TRANSITION_DURATION } from '../../constants';
import { useWave } from '../../hooks/useWave';
import {
	Img,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

type Props = {
	src: string;
};

export function WeatherPicture({ src }: Props) {
	const frame = useCurrentFrame();
	const { fps, width } = useVideoConfig();

	const wave = useWave({ ondulation: 15 });

	const spr = spring({
		fps,
		frame,
		config: { damping: 400 },
		durationInFrames: TRANSITION_DURATION,
	});
	return (
		<Img
			style={{
				position: 'absolute',
				top: '20%',
				zIndex: '-10',
				left: '25%',
				borderRadius: '50%',
				transform: `translateX(${interpolate(
					spr,
					[0, 1],
					[width, 0]
				)}px) translateY(${wave}px) rotate(${frame}deg) scale(2)`,
			}}
			src={src}
			alt=""
		/>
	);
}
