import { useCallback, useEffect, useState } from 'react';
import { Composition, continueRender, delayRender } from 'remotion';
import { MainComposition } from './compositions/MainComposition';
import {
	COMPOSITION_HEIGHT,
	COMPOSITION_WIDTH,
	DURATION_IN_FRAMES,
	FPS,
} from './constants';
import './styles/index.css';
import { Weather } from '../types/api-reponse';
import { getWeatherData } from '../services/getWeatherData';

export const RemotionRoot: React.FC = () => {
	const [weatherData, setWeatherData] = useState<Weather | null>(null);
	const [handle] = useState(() => delayRender());

	const handleGetWeatherData = useCallback(async () => {
		const persistedWeatherData = JSON.parse(
			localStorage.getItem('weatherData') ?? 'null'
		);

		if (!persistedWeatherData) {
			const weatherData = await getWeatherData({ location: 'london' });
			localStorage.setItem('weatherData', JSON.stringify(weatherData));
			setWeatherData(weatherData);

			return continueRender(handle);
		}

		setWeatherData(persistedWeatherData);
		continueRender(handle);
	}, [handle]);

	useEffect(() => {
		handleGetWeatherData();
	}, [handleGetWeatherData]);

	return (
		<>
			{weatherData && (
				<Composition
					id="MyComposition"
					component={MainComposition}
					defaultProps={weatherData}
					fps={FPS}
					durationInFrames={DURATION_IN_FRAMES}
					width={COMPOSITION_WIDTH}
					height={COMPOSITION_HEIGHT}
				/>
			)}
		</>
	);
};
