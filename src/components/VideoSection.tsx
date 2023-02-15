import { WeatherVideoPlayer } from '@/components/WeatherVideoPlayer';
import { LocationForm } from '@/components/LocationForm';
import { useEffect, useState } from 'react';
import { Coordinates } from '@/types/globals';
import { DetectLocationBtn } from './DetectLocationBtn';
import { useWeather } from '@/hooks/useWeather';
// import { RenderedVideo } from './RenderedVideo';
// import { isWeatherData } from '@/utils/isWeatherData';
// import { renderVideoOnServer } from '@/services/renderVideoOnServer';

export function VideoSection() {
	const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
	const { error, weatherData, loading, handleGetWeather } = useWeather();
	// const [videoSrc, setVideoSrc] = useState<string | null>(null);

	// useEffect(() => {
	// 	if (isWeatherData(weatherData)) {
	// 		renderVideoOnServer(weatherData).then((response) => {
	// 			if (response.ok) setVideoSrc(response.data);
	// 			// to do: handle error
	// 		});
	// 	}
	// }, [weatherData]);

	useEffect(() => {
		if (coordinates) handleGetWeather(coordinates);
	}, [coordinates, handleGetWeather]);

	return (
		<div className="flex gap-4 flex-col lg:flex-row items-center justify-center bg-zinc-900 p-4">
			<div className="flex flex-col gap-4 items-stretch">
				<LocationForm onCoordinates={setCoordinates} />
				<p>or</p>
				<DetectLocationBtn onCoordinates={setCoordinates} />
			</div>

			{loading && <p>Loading....</p>}

			<div className="flex flex-col">
				{error ? (
					<p className="text-red-500">{error}</p>
				) : weatherData ? (
					<WeatherVideoPlayer weatherData={weatherData} />
				) : (
					<p className="my-4">Give us a location to render your video...</p>
				)}
			</div>

			{/* {videoSrc && <RenderedVideo src={videoSrc} />} */}
		</div>
	);
}
