import { useUserLocation } from '@/hooks/useUserLocation';
import { Coordinates } from '@/types/globals';
import { useEffect } from 'react';

type Props = {
	onCoordinates: (location: Coordinates) => void;
};

export function DetectLocationBtn({ onCoordinates }: Props) {
	const { handleLocationRequest, userCoordinates, locationError } =
		useUserLocation({ isInmediate: false });

	useEffect(() => {
		if (userCoordinates) {
			onCoordinates(userCoordinates);
		}
	}, [userCoordinates, onCoordinates]);

	return (
		<div className="flex flex-col p-4 gap-4">
			<button
				className="mx-auto w-full"
				type="button"
				onClick={handleLocationRequest}
			>
				Detect my location 🔎
			</button>

			{locationError?.message && (
				<p className="text-red-500">{locationError.message}</p>
			)}
		</div>
	);
}
