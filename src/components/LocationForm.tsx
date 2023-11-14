import { useRef, useState } from 'react';
import { getCoordsByCityName } from '@/services/getCoordsByCityName';
import { Coordinates } from '@/types/globals';
import compare from 'just-compare';

const LOCATION_INPUT_NAME = 'user-location';

type Props = {
	onCoordinates: (location: Coordinates) => void;
	isDisabled: boolean;
};

export function LocationForm({ onCoordinates, isDisabled }: Props) {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const lastUserLocation = useRef<{
		cityName: string;
		coordinates: Coordinates;
	} | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;

		const locationInput = form[LOCATION_INPUT_NAME];

		if (!locationInput) return;

		setError(null);

		const userCity = locationInput.value?.trim();
		const isSameCity = compare(userCity, lastUserLocation.current?.cityName);

		const lastCoordinates = lastUserLocation.current?.coordinates;

		if (isSameCity && lastCoordinates) {
			return onCoordinates(lastCoordinates);
		}

		setLoading(true);

		const response = await getCoordsByCityName(userCity);

		if (!response.ok) {
			setLoading(false);
			setError(response.message);
			return;
		}

		const coordinates = response.data;
		lastUserLocation.current = { cityName: userCity, coordinates };
		setLoading(false);
		setError(null);
		onCoordinates(coordinates);
	};

	return (
		<form
			className="w-full flex flex-col gap-4 justify-center rounded-md p-4 mx-auto my-0"
			onSubmit={handleSubmit}
		>
			<label className="text-lg" htmlFor={LOCATION_INPUT_NAME}>
				Enter a city name
			</label>
			<input
				required
				className="bg-slate-300"
				type="text"
				name={LOCATION_INPUT_NAME}
				id={LOCATION_INPUT_NAME}
				placeholder="London"
			/>

			<button
				disabled={loading || isDisabled}
				type="submit"
				className="w-full max-w-none"
			>
				Submit 🚀
			</button>

			{error && <p className="text-red-500">{error}</p>}
		</form>
	);
}
