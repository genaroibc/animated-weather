import { Coordinates } from '@/types/globals';

const GEOCODER_API_URL = process.env.NEXT_PUBLIC_GEOCODER_API_URL;
const GEOCODER_API_KEY = process.env.NEXT_PUBLIC_GEOCODER_API_KEY;

const ERROR_MESSAGE = 'env variable is not defined';

if (!GEOCODER_API_URL) {
	throw new Error(`"GEOCODER_API_URL" ${ERROR_MESSAGE}`);
}

if (!GEOCODER_API_KEY) {
	throw new Error(`"API_KEY" ${ERROR_MESSAGE} - ` + process.env.API_KEY);
}

export function getCoordsByCityName(cityName: string): Promise<Coordinates> {
	const URL = `${GEOCODER_API_URL}?q=${cityName.trim()}&appid=${GEOCODER_API_KEY}`;

	return fetch(URL)
		.then((res) => res.json())
		.then(({ lon, lat }) => ({ longitude: lon, latitude: lat }));
}
