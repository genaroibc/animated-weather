import { useCallback, useEffect, useState } from 'react';

type UserLocation = { latitude: number; longitude: number };

type Params = {
	isInmediate: boolean;
};

export function useUserLocation({ isInmediate }: Params) {
	const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
	const [locationError, setLocationError] =
		useState<GeolocationPositionError | null>(null);

	const handleLocationRequest = useCallback(() => {
		const onLocationReqSuccess: PositionCallback = (res) => {
			const { latitude, longitude } = res.coords;

			setUserLocation({ latitude, longitude });
			setLocationError(null);
		};

		const onLocationReqError: PositionErrorCallback = (error) => {
			setUserLocation(null);
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

	return { userLocation, locationError, handleLocationRequest };
}
