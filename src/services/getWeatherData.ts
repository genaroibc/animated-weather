import { Coordinates } from '@/types/globals';
import { Weather } from '../types/api-reponse';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ERROR_MESSAGE = 'env variable is not defined';

if (!API_URL) {
	throw new Error(`"API_URL" ${ERROR_MESSAGE}`);
}

if (!API_KEY) {
	throw new Error(`"API_KEY" ${ERROR_MESSAGE}`);
}

export function getWeatherData({
	latitude,
	longitude,
}: Coordinates): Promise<Weather> {
	const URL = `${API_URL}?appid=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`;

	return fetch(URL).then((res) => res.json());
}
