import { Weather } from '@/types/api-reponse';
import { Composition } from 'remotion';
import { MainComposition } from './compositions/MainComposition';
import {
	COMPOSITION_HEIGHT,
	COMPOSITION_WIDTH,
	DURATION_IN_FRAMES,
	FPS,
} from './constants';
import './styles/index.css';

type Props = {
	weatherData: Weather;
};

export function RemotionRoot({ weatherData }: Props) {
	return (
		<Composition
			id="MyComposition"
			component={MainComposition}
			defaultProps={weatherData}
			fps={FPS}
			durationInFrames={DURATION_IN_FRAMES}
			width={COMPOSITION_WIDTH}
			height={COMPOSITION_HEIGHT}
		/>
	);
}
