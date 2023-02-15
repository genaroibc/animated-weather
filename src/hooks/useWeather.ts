import { getWeatherData } from '@/services/getWeatherData';
import { Weather } from '@/types/api-reponse';
import { Coordinates } from '@/types/globals';
import { useCallback, useEffect, useState } from 'react';

type Params = {
	isInmediate: boolean;
};

export function useWeather({ isInmediate }: Params) {
	const [weatherData, setWeatherData] = useState<Weather | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleWeatherRequest = useCallback(async (coordinates: Coordinates) => {
		setLoading(true);
		const weatherData = await getWeatherData(coordinates);

		if (!weatherData.ok) {
			setLoading(false);
			setError(weatherData.message);
			return;
		}

		setLoading(false);
		setError(null);
		setWeatherData(weatherData.data);
		window.localStorage.setItem(
			'weatherData',
			JSON.stringify(weatherData.data)
		);
	}, []);

	const handleGetWeather = useCallback(
		async (coordinates: Coordinates) => {
			const persistedWeatherData = JSON.parse(
				window.localStorage.getItem('weatherData') ?? 'null'
			);

			if (!persistedWeatherData && coordinates) {
				handleWeatherRequest(coordinates);
				return;
			}

			// the requested data may be already saved
			if (persistedWeatherData && coordinates) {
				const { lat: persistedLatitude, lon: persistedLongitude } =
					persistedWeatherData.coord ?? {};

				const { latitude, longitude } = coordinates;

				const isSameWeatherData =
					persistedLatitude === latitude && persistedLongitude === longitude;

				if (!isSameWeatherData) {
					handleWeatherRequest(coordinates);
					return;
				}

				setWeatherData(persistedWeatherData);
			}

			setWeatherData(persistedWeatherData);
		},
		[handleWeatherRequest]
	);

	useEffect(() => {
		if (isInmediate) {
			handleGetWeather({ longitude: 0, latitude: 0 });
		}
	}, [isInmediate, handleGetWeather]);

	return { error, loading, weatherData, handleGetWeather };
}
