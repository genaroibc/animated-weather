import { MainComposition } from '@/remotion/compositions/MainComposition';
import {
	COMPOSITION_HEIGHT,
	COMPOSITION_WIDTH,
	DURATION_IN_FRAMES,
	FPS,
} from '@/remotion/constants';
import { Player } from '@remotion/player';
import { useEffect, useState } from 'react';
import { Weather } from '../types/api-reponse';
import { getWeatherData } from '../services/getWeatherData';
import { Coordinates } from '@/types/globals';

type Props = {
	locationCoords: Coordinates;
};

export function WeatherVideoPlayer({ locationCoords }: Props) {
	const [weatherData, setWeatherData] = useState<Weather | null>(
		JSON.parse(localStorage.getItem('weatherData') ?? 'null')
	);

	useEffect(() => {
		setWeatherData(null);

		const handleGetWeatherData = async (coordinates: Coordinates) => {
			const persistedWeatherData = JSON.parse(
				localStorage.getItem('weatherData') ?? 'null'
			);

			if (!persistedWeatherData) {
				const weatherData = await getWeatherData(coordinates);
				localStorage.setItem('weatherData', JSON.stringify(weatherData));
				setWeatherData(weatherData);

				return;
			}

			setWeatherData(persistedWeatherData);
		};

		handleGetWeatherData(locationCoords);
	}, [locationCoords]);

	return (
		<>
			{weatherData ? (
				<div className="text-center bg-terciary-color max-w-max mx-auto flex justify-center items-center p-4 rounded-md">
					<Player
						controls
						component={MainComposition}
						compositionHeight={COMPOSITION_HEIGHT}
						compositionWidth={COMPOSITION_WIDTH}
						durationInFrames={DURATION_IN_FRAMES}
						fps={FPS}
						inputProps={weatherData}
					/>
				</div>
			) : (
				<p>Fetching data...</p>
			)}
		</>
	);
}
