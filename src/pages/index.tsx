import { WeatherVideoPlayer } from '@/components/WeatherVideoPlayer';

export default function Home() {
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
				>
					<label style={{ fontSize: '1.2rem' }} htmlFor="user-location">
						Your location
					</label>
					<input
						required
						type="text"
						name="user-location"
						id="user-location"
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
					<button type="button">Detect my location 🔎</button>
				</div>
			</section>

			<div style={{ textAlign: 'center' }}>
				<WeatherVideoPlayer />
			</div>
		</main>
	);
}
