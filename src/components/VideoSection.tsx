import { WeatherVideoPlayer } from '@/components/WeatherVideoPlayer';
import { LocationForm } from '@/components/LocationForm';
import { useEffect, useRef, useState } from 'react';
import { Coordinates } from '@/types/globals';
import { DetectLocationBtn } from './DetectLocationBtn';
import { useWeather } from '@/hooks/useWeather';
import { Loader } from './Loader';
import compare from 'just-compare';
import { Footer } from './Footer';
// import { RenderedVideo } from './RenderedVideo';
// import { isWeatherData } from '@/utils/isWeatherData';
// import { renderVideoOnServer } from '@/services/renderVideoOnServer';

export function VideoSection() {
	const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
	const { error, weatherData, loading, handleGetWeather } = useWeather({
		isInmediate: true,
	});
	const lastCoordinates = useRef<Coordinates | null>(null);
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
		const areSameCoords = compare(coordinates, lastCoordinates.current);

		if (coordinates && !areSameCoords) {
			handleGetWeather(coordinates);
			lastCoordinates.current = coordinates;
		}
	}, [coordinates, handleGetWeather]);

	return (
		<div className="flex gap-4 flex-col lg:flex-row justify-center p-4">
      <div className="flex flex-col gap-4 items-stretch bg-slate-900 p-4">
				<LocationForm isDisabled={loading} onCoordinates={setCoordinates} />
				<p>or</p>
				<DetectLocationBtn
					isDisabled={loading}
					onCoordinates={setCoordinates}
				/>
				{loading && <Loader />}

        <div className="flex justify-center items-end h-full w-full">
          <Footer />
        </div>
			</div>

      <div className="flex flex-col bg-slate-900 p-4">
				{error ? (
					<p className="text-red-500">{error}</p>
				) : weatherData ? (
					<WeatherVideoPlayer weatherData={weatherData} />
				) : (
					<p className="m-0 p-0 min-w-[500px] grid place-content-center min-h-[500px]">
						Give us a location to render your video...
					</p>
				)}
			</div>

			{/* {videoSrc && <RenderedVideo src={videoSrc} />} */}
		</div>
	);
}
