import { interpolate } from 'remotion';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Weather } from '../../types/api-reponse';
import { CompositionLayout } from '../components/CompositionLayout';

type Props = {
	city: Weather['name'];
};

export function Title({ city }: Props) {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const scale = spring({ fps, frame });
	const scale2 = spring({
		fps,
		frame,
		from: 0.0001,
		to: 1,
		config: {
			stiffness: 100,
			damping: 6,
			mass: 1,
		},
		durationInFrames: 50,
	});

	const driver = spring({
		frame,
		fps,
	});

	return (
		<CompositionLayout>
			<span
				style={{
					transform: `scale(${scale2})`,
				}}
				className="text-6xl"
			>
				🌤️
			</span>
			<p
				style={{ marginTop: interpolate(driver, [0, 1], [200, 0]) }}
				className="text-2xl m-0"
			>
				This is the climate in
			</p>
			<h1
				className="text-white text-6xl text-center w-full m-0"
				style={{ transform: `scale(${scale})` }}
			>
				{city}
			</h1>
		</CompositionLayout>
	);
}
