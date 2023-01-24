import { Weather } from '../types/api-reponse';
import { CompositionLayout } from './shared/CompositionLayout';
type Props = {
	city: Weather['name'];
};

export function Title({ city }: Props) {
	// Const scale = spring({ fps, frame });

	return (
		<CompositionLayout>
			{/* <span
				className="text-6xl animate-bounce"
				style={{ animationDirection: 'alternate' }}
			>
      👋
			</span> */}
			{/* <h4
				className="text-5xl opacity-1"
				style={{ transform: `scale(${scale})` }}
			>
      ☀️
			</h4> */}
			<p className="text-2xl m-0">This is the climate in</p>
			<h1 className="text-white text-6xl text-center w-full m-0 ">{city}</h1>
		</CompositionLayout>
	);
}
