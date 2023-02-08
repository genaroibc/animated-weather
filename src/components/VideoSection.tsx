import { WeatherVideoPlayer } from '@/components/WeatherVideoPlayer';
import { LocationForm } from '@/components/LocationForm';
import { useUserLocation } from '@/hooks/useUserLocation';
import { getCoordsByCityName } from '@/services/getCoordsByCityName';
import { useState } from 'react';
import { Coordinates } from '@/types/globals';
const LOCATION_INPUT_NAME = 'user-location';

export function VideoSection() {
	const [userCoords, setUserCoords] = useState<Coordinates | null>(null);

	const { handleLocationRequest, userCoordinates, locationError } =
		useUserLocation({ isInmediate: false });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;

		const locationInput = form[LOCATION_INPUT_NAME]?.value;
		const userLocation = locationInput?.trim();

		if (userLocation) {
			getCoordsByCityName(userLocation).then(setUserCoords);
		}
	};

	console.log({ userCoordinates, locationError });

	return (
		<>
			<LocationForm
				handleSubmit={handleSubmit}
				inputName={LOCATION_INPUT_NAME}
			/>

			<p>or</p>

			<button className="mx-auto" type="button" onClick={handleLocationRequest}>
				Detect my location 🔎
			</button>

			{userCoords ? (
				<WeatherVideoPlayer locationCoords={userCoords} />
			) : (
				<h3>
					{locationError?.message ? (
						locationError.message
					) : (
						<p className="my-4">Give us a location to render your video...</p>
					)}
				</h3>
			)}
		</>
	);
}
