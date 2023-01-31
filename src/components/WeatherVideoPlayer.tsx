import { MainComposition } from '@/remotion/compositions/MainComposition';
import {
	COMPOSITION_HEIGHT,
	COMPOSITION_WIDTH,
	DURATION_IN_FRAMES,
	FPS,
} from '@/remotion/constants';
import { Player } from '@remotion/player';

export function WeatherVideoPlayer() {
	return (
		<div
			style={{
				textAlign: 'center',
				backgroundColor: 'var(--terciary-color)',
				maxWidth: 'max-content',
				margin: 'auto',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '1rem',
				borderRadius: '5px',
			}}
		>
			<Player
				controls
				component={MainComposition}
				compositionHeight={COMPOSITION_HEIGHT}
				compositionWidth={COMPOSITION_WIDTH}
				durationInFrames={DURATION_IN_FRAMES}
				fps={FPS}
				inputProps={{
					coord: { lon: -0.1257, lat: 51.5085 },
					weather: [
						{
							id: 804,
							main: 'Clouds',
							description: 'overcast clouds',
							icon: '04d',
						},
					],
					base: 'stations',
					main: {
						temp: 4.12,
						feels_like: 1.8,
						temp_min: 2.86,
						temp_max: 5.56,
						pressure: 1037,
						humidity: 80,
					},
					visibility: 10_000, // in metters. Max is 10_000 metters
					wind: { speed: 2.57 /* metters/second */, deg: 60 }, // wind direction in degrees
					clouds: {
						all: 100 /* percentage of clouds. 100% is so cloudly (implement a message for this) */,
					},
					dt: 1674576100,
					sys: {
						type: 2,
						id: 2075535,
						country: 'GB',
						sunrise: 1674546627,
						sunset: 1674578053,
					},
					timezone: 0, // utc time zone
					id: 2643743,
					name: 'London',
					cod: 200,
				}}
			/>
		</div>
	);
}
