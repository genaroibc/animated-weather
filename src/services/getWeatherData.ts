import { Coordinates, KnownError, KnownResponse } from '@/types/globals';
import { isWeatherData } from '@/utils/isWeatherData';
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

export async function getWeatherData({
	latitude,
	longitude,
}: Coordinates): Promise<KnownResponse<Weather> | KnownError> {
	const URL = `${API_URL}?appid=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`;

	try {
		const response = await fetch(URL);

		const weatherData = await response.json();

		if (isWeatherData(weatherData)) {
			return { ok: true, data: weatherData };
		}

		throw response;
	} catch (error) {
		return { ok: false, message: 'There was an error, please try again later' };
	}
}
