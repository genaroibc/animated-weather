import { useState } from 'react';
import { WeatherVideoPlayer } from '@/components/WeatherVideoPlayer';
import { LocationForm } from '@/components/LocationForm';
import { Hero } from '@/components/Hero';

const LOCATION_INPUT_NAME = 'user-location';

type LocationState = string | { longitude: number; latitude: number };

export default function Home() {
	const [userLocation, setUserLocation] = useState<LocationState>();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;

		const location = form[LOCATION_INPUT_NAME]?.value;
		const userLocation = location?.trim();

		if (userLocation) {
			setUserLocation(userLocation);
		}
	};

	const handleDetectUserLocation = () => {
		const onSuccess: PositionCallback = (res) => {
			console.log({ res });
			const { latitude, longitude } = res.coords;

			setUserLocation({ latitude, longitude });
		};

		const onError: PositionErrorCallback = () => {
			setUserLocation('There was an error accessing to your location.');
			// -> TODO: setError()
		};

		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	};

	return (
		<main
			style={{
				margin: '1rem auto',
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				gap: '1rem',
			}}
		>
			<Hero />

			<LocationForm
				handleDetectUserLocation={handleDetectUserLocation}
				handleSubmit={handleSubmit}
				inputName={LOCATION_INPUT_NAME}
			/>

			{userLocation ? (
				<WeatherVideoPlayer />
			) : (
				<h3>Enter a location to render your video...</h3>
			)}
		</main>
	);
}
