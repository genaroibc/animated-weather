import { WeatherVideoPlayer } from '@/components/WeatherVideoPlayer';
import { LocationForm } from '@/components/LocationForm';
import { useEffect, useState } from 'react';
import { Coordinates } from '@/types/globals';
import { DetectLocationBtn } from './DetectLocationBtn';
import { Weather } from '@/types/api-reponse';
import { getWeatherData } from '@/services/getWeatherData';
import { RenderedVideo } from './RenderedVideo';
import { isWeatherData } from '@/utils/isWeatherData';
import { renderVideoOnServer } from '@/services/renderVideoOnServer';

export function VideoSection() {
	const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
	const [weatherData, setWeatherData] = useState<Weather | null>(null);
	const [videoSrc, setVideoSrc] = useState<string | null>(null);

	useEffect(() => {
		if (isWeatherData(weatherData)) {
			renderVideoOnServer(weatherData).then((response) => {
				if (response.ok) setVideoSrc(response.data);
				// to do: handle error
			});
		}
	}, [weatherData]);

	useEffect(() => {
		const handleGetAndSetWeatherData = async (coordinates: Coordinates) => {
			const weatherData = await getWeatherData(coordinates);

			if (!weatherData.ok) {
				return; // To Do: handle error for example with a toast notification
			}

			setWeatherData(weatherData.data);
			localStorage.setItem('weatherData', JSON.stringify(weatherData.data));
		};

		const handleWeatherUpdate = async () => {
			const persistedWeatherData = JSON.parse(
				localStorage.getItem('weatherData') ?? 'null'
			);

			if (!persistedWeatherData && coordinates) {
				handleGetAndSetWeatherData(coordinates);
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
					handleGetAndSetWeatherData(coordinates);
					return;
				}

				setWeatherData(persistedWeatherData);
			}

			setWeatherData(persistedWeatherData);
		};

		handleWeatherUpdate();
	}, [coordinates]);

	return (
		<>
			<LocationForm onCoordinates={setCoordinates} />

			<p>or</p>

			<DetectLocationBtn onCoordinates={setCoordinates} />

			{weatherData && <WeatherVideoPlayer weatherData={weatherData} />}

			<p className="my-4">Give us a location to render your video...</p>

			{videoSrc && <RenderedVideo src={videoSrc} />}
		</>
	);
}
