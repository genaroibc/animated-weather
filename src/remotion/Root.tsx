import { Composition } from 'remotion';
import { MainComposition } from './compositions/MainComposition';
import {
	COMPOSITION_HEIGHT,
	COMPOSITION_WIDTH,
	DURATION_IN_FRAMES,
	FPS,
} from './constants';
import { mockWeatherData } from './mock-weather-data';
import './styles/index.css';

export function RemotionRoot() {
	return (
		<Composition
			id="MyComposition"
			component={MainComposition}
			defaultProps={mockWeatherData}
			fps={FPS}
			durationInFrames={DURATION_IN_FRAMES}
			width={COMPOSITION_WIDTH}
			height={COMPOSITION_HEIGHT}
		/>
	);
}
