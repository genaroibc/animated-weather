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

	console.log({ userCoordinates, locationError });

	return (
		<>
			<button className="mx-auto" type="button" onClick={handleLocationRequest}>
				Detect my location 🔎
			</button>

			{locationError?.message && <p>locationError.message</p>}
		</>
	);
}
