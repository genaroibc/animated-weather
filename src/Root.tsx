import { useCallback, useEffect, useState } from 'react';
import { Composition, continueRender, delayRender } from 'remotion';
import { MainComposition } from './compositions/MainComposition';
import { DURATION, FPS } from './constants';
import { getWeatherData } from './services/getWeatherData';
import './style.css';
import { Weather } from './types/api-reponse';

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

			return;
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
					durationInFrames={DURATION}
					width={500}
					height={500}
				/>
			)}
		</>
	);
};
