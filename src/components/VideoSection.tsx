import { WeatherVideoPlayer } from '@/components/WeatherVideoPlayer';
import { LocationForm } from '@/components/LocationForm';
import { useState } from 'react';
import { Coordinates } from '@/types/globals';
import { DetectLocationBtn } from './DetectLocationBtn';

export function VideoSection() {
	const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

	return (
		<>
			<LocationForm onCoordinates={setCoordinates} />

			<p>or</p>

			<DetectLocationBtn onCoordinates={setCoordinates} />

			{coordinates ? (
				<WeatherVideoPlayer locationCoords={coordinates} />
			) : (
				<p className="my-4">Give us a location to render your video...</p>
			)}
		</>
	);
}
