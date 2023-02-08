import { useUserLocation } from '@/hooks/useUserLocation';

export function DetectLocationBtn() {
	const { handleLocationRequest, userCoordinates, locationError } =
		useUserLocation({ isInmediate: false });

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
