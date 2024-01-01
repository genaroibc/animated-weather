import { defaultCoordinates } from '@/remotion/constants';
import { getCoordsByCityName } from '@/services/getCoordsByCityName';
import { getWeatherData } from '@/services/getWeatherData';
import { Weather } from '@/types/api-reponse';
import { Coordinates } from '@/types/globals';
import { useCallback, useEffect, useState } from 'react';

type Params = {
	isImmediate: boolean;
};

/**
 * Custom hook for fetching weather data.
 * @param {Object} params - The parameters for the hook.
 * @param {boolean} params.isImmediate - Flag indicating whether to fetch weather data immediately.
 * @returns {Object} - An object containing the weather data, loading state, error message, and functions for fetching weather data.
 */
export function useWeather({ isImmediate }: Params) {
	const [weatherData, setWeatherData] = useState<Weather | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleGetWeather = useCallback(async (coordinates: Coordinates) => {
		console.log('FETCHING WEATHER DATA');

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
	}, []);

	const getWeatherByCoordinates = useCallback(
		async (coordinates: Coordinates) => {
      console.log({ coordinates });
      console.log("GET COORDS");
			handleGetWeather(coordinates);
		},
		[handleGetWeather]
	);

	const getWeatherByName = useCallback(
		async (locationInput: string) => {
      console.log('GET CITY NAME');

			if (!locationInput) return;
			setError(null);
			setLoading(true);

			const response = await getCoordsByCityName(locationInput);

			if (!response.ok) {
				setLoading(false);
				setError(response.message);
				return;
			}

			const coordinates = response.data;
			getWeatherByCoordinates(coordinates);
		},
		[getWeatherByCoordinates]
	);

	useEffect(() => {
		if (isImmediate) {
			getWeatherByCoordinates(defaultCoordinates);
		}
	}, [isImmediate, getWeatherByCoordinates]);

	return {
		error,
		loading,
		weatherData,
		getWeatherByCoordinates,
		getWeatherByName,
	};
}
