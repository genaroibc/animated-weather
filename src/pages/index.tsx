import { useState } from 'react';
import { WeatherVideoPlayer } from '@/components/WeatherVideoPlayer';

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
			<header>
				<h1
					style={{ fontSize: '4rem', textAlign: 'center', margin: '3rem auto' }}
				>
					Animated Weather
				</h1>
				<h2 style={{ fontSize: '2rem', textAlign: 'center' }}>
					Create an animated video of the weather in your zone
				</h2>
			</header>

			<section
				style={{
					display: 'flex',
					gap: '1rem',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'var(--secondary-color)',
					borderRadius: '5px',

					padding: '2rem',
					margin: '3rem auto',
				}}
			>
				<form
					style={{
						display: 'flex',
						gap: '1rem',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'var(--terciary-color)',
						borderRadius: '5px',
						padding: '1rem',
					}}
					onSubmit={handleSubmit}
				>
					<label style={{ fontSize: '1.2rem' }} htmlFor={LOCATION_INPUT_NAME}>
						Your location
					</label>
					<input
						required
						type="text"
						name={LOCATION_INPUT_NAME}
						id={LOCATION_INPUT_NAME}
						placeholder="London"
					/>

					<button type="submit">Submit</button>
				</form>

				<h3 id="location-form-divider">or</h3>

				<div
					style={{
						backgroundColor: 'var(--terciary-color)',
						borderRadius: '5px',
						padding: '1rem',
					}}
				>
					<button type="button" onClick={handleDetectUserLocation}>
						Detect my location 🔎
					</button>
				</div>
			</section>

			{userLocation ? (
				<>
					<h1>{JSON.stringify(userLocation)}</h1>
					<div
						style={{
							textAlign: 'center',
							backgroundColor: 'var(--terciary-color)',
							maxWidth: 'max-content',
							margin: 'auto',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							padding: '1rem',
							borderRadius: '5px',
						}}
					>
						<WeatherVideoPlayer />
					</div>
				</>
			) : (
				<h3>Enter a location to render your video...</h3>
			)}
		</main>
	);
}
