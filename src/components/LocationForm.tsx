type Props = {
	handleSubmit: (e: React.FormEvent) => void;
	handleDetectUserLocation: () => void;
	inputName: string;
};

export function LocationForm({
	handleSubmit,
	handleDetectUserLocation,
	inputName,
}: Props) {
	return (
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
				<label style={{ fontSize: '1.2rem' }} htmlFor={inputName}>
					Your location
				</label>
				<input
					required
					type="text"
					name={inputName}
					id={inputName}
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
	);
}
