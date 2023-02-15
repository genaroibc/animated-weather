import { MainComposition } from '@/remotion/compositions/MainComposition';
import {
	COMPOSITION_HEIGHT,
	COMPOSITION_WIDTH,
	DURATION_IN_FRAMES,
	FPS,
} from '@/remotion/constants';
import { Player } from '@remotion/player';
import { Weather } from '../types/api-reponse';

type Props = {
	weatherData: Weather;
};

export function WeatherVideoPlayer({ weatherData }: Props) {
	return (
		<div className="text-center mx-auto flex justify-center items-center p-4 rounded-md">
			<Player
				controls
				autoPlay
				doubleClickToFullscreen
				initiallyShowControls
				component={MainComposition}
				compositionHeight={COMPOSITION_HEIGHT}
				compositionWidth={COMPOSITION_WIDTH}
				durationInFrames={DURATION_IN_FRAMES}
				fps={FPS}
				inputProps={weatherData}
			/>
		</div>
	);
}
