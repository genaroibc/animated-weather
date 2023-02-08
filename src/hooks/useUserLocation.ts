import { Coordinates } from '@/types/globals';
import { useCallback, useEffect, useState } from 'react';

type Params = {
	isInmediate: boolean;
};

export function useUserLocation({ isInmediate }: Params) {
	const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(
		null
	);

	const [locationError, setLocationError] =
		useState<GeolocationPositionError | null>(null);

	const handleLocationRequest = useCallback(() => {
		const onLocationReqSuccess: PositionCallback = (res) => {
			const { latitude, longitude } = res.coords;

			setUserCoordinates({ latitude, longitude });
			setLocationError(null);
		};

		const onLocationReqError: PositionErrorCallback = (error) => {
			setUserCoordinates(null);
			setLocationError(error);
		};

		navigator.geolocation.getCurrentPosition(
			onLocationReqSuccess,
			onLocationReqError
		);
	}, []);

	useEffect(() => {
		if (isInmediate) {
			handleLocationRequest();
		}
	}, [handleLocationRequest, isInmediate]);

	return {
		userCoordinates,
		locationError,
		handleLocationRequest,
	};
}
