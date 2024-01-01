import { MainComposition } from '@/remotion/compositions/MainComposition';
import {
	COMPOSITION_HEIGHT,
	COMPOSITION_WIDTH,
	DURATION_IN_FRAMES,
	FPS,
} from '@/remotion/constants';
import { Player, PlayerRef } from '@remotion/player';
import { Weather } from '../types/api-reponse';
import { useEffect, useRef } from 'react';

type Props = {
	weatherData: Weather;
};

export function WeatherVideoPlayer({ weatherData }: Props) {
  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    playerRef.current?.seekTo(0)
  }, [weatherData]);

	return (
		<div className="m-0 p-0 text-center mx-auto flex justify-center items-center rounded-md">
			<Player
        ref={playerRef}
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
