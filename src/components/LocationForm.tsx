import { useState } from 'react';
import { getCoordsByCityName } from '@/services/getCoordsByCityName';
import { Coordinates } from '@/types/globals';

const LOCATION_INPUT_NAME = 'user-location';

type Props = {
	onCoordinates: (location: Coordinates) => void;
};

export function LocationForm({ onCoordinates }: Props) {
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;

		const locationInput = form[LOCATION_INPUT_NAME]?.value;
		const userLocation = locationInput?.trim();

		if (userLocation) {
			const response = await getCoordsByCityName(userLocation);

			if (!response.ok) {
				setError(response.message);
				return;
			}

			setError(null);
			onCoordinates(response.data);
		}
	};
	return (
		<form
			className="w-full flex flex-col gap-4 justify-center rounded-md p-4 mx-auto my-0"
			onSubmit={handleSubmit}
		>
			<label className="text-lg" htmlFor={LOCATION_INPUT_NAME}>
				Your location
			</label>
			<input
				required
				className="bg-slate-300"
				type="text"
				name={LOCATION_INPUT_NAME}
				id={LOCATION_INPUT_NAME}
				placeholder="London"
			/>

			<button type="submit" className="w-full max-w-none">
				Submit
			</button>

			{error && <p className="text-red-500">{error}</p>}
		</form>
	);
}
