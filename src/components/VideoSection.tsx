import { WeatherVideoPlayer } from '@/components/WeatherVideoPlayer';
import { LocationForm } from '@/components/LocationForm';
import { getCoordsByCityName } from '@/services/getCoordsByCityName';
import { useState } from 'react';
import { Coordinates } from '@/types/globals';
import { DetectLocationBtn } from './DetectLocationBtn';
const LOCATION_INPUT_NAME = 'user-location';

export function VideoSection() {
	const [userCoords, setUserCoords] = useState<Coordinates | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;

		const locationInput = form[LOCATION_INPUT_NAME]?.value;
		const userLocation = locationInput?.trim();

		if (userLocation) {
			getCoordsByCityName(userLocation).then(setUserCoords);
		}
	};

	return (
		<>
			<LocationForm
				handleSubmit={handleSubmit}
				inputName={LOCATION_INPUT_NAME}
			/>

			<p>or</p>

			<DetectLocationBtn />

			{userCoords ? (
				<WeatherVideoPlayer locationCoords={userCoords} />
			) : (
				<p className="my-4">Give us a location to render your video...</p>
			)}
		</>
	);
}
