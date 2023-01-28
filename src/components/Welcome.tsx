import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Weather } from '../types/api-reponse';
import { CompositionLayout } from './shared/CompositionLayout';

type Props = {
	city: Weather['name'];
};

export function Title({ city }: Props) {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const scale = spring({ fps, frame });

	return (
		<CompositionLayout>
			<span className="text-6xl animate-bounce">🌤️</span>
			<p className="text-2xl m-0">This is the climate in</p>
			<h1
				className="text-white text-6xl text-center w-full m-0"
				style={{ transform: `scale(${scale})` }}
			>
				{city}
			</h1>
		</CompositionLayout>
	);
}
