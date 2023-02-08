import { WeatherVideoPlayer } from '@/components/WeatherVideoPlayer';
import { LocationForm } from '@/components/LocationForm';
import { Hero } from '@/components/Hero';
const LOCATION_INPUT_NAME = 'user-location';
import { useUserLocation } from '@/hooks/useUserLocation';
import { getCoordsByCityName } from '@/services/getCoordsByCityName';
import { useState } from 'react';
import { Coordinates } from '@/types/globals';

export default function Home() {
	const { handleLocationRequest, userCoordinates, locationError } =
		useUserLocation({ isInmediate: false });
	const [resolvedCoords, setResolvedCoords] = useState<Coordinates | null>(
		null
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;

		const locationInput = form[LOCATION_INPUT_NAME]?.value;
		const userLocation = locationInput?.trim();

		if (userLocation) {
			getCoordsByCityName(userLocation).then(setResolvedCoords);
		}
	};
	console.log({ userCoordinates, locationError });
	return (
		<main className="mx-auto my-4 flex justify-center flex-col gap-4 text-center">
			<Hero />

			<LocationForm
				handleSubmit={handleSubmit}
				inputName={LOCATION_INPUT_NAME}
			/>

			<p>or</p>

			<button className="mx-auto" type="button" onClick={handleLocationRequest}>
				Detect my location 🔎
			</button>

			{resolvedCoords ? (
				<WeatherVideoPlayer locationCoords={resolvedCoords} />
			) : (
				<h3>
					{locationError?.message ? (
						locationError.message
					) : (
						<p className="my-4">Give us a location to render your video...</p>
					)}
				</h3>
			)}
		</main>
	);
}
