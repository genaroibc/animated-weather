import { Weather } from '../types/api-reponse';

const { API_URL, API_KEY } = process.env;
const ERROR_MESSAGE = 'env variable is not defined';

if (!API_URL) throw new Error(`"API_URL" ${ERROR_MESSAGE}`);
if (!API_KEY) throw new Error(`"API_KEY" ${ERROR_MESSAGE}`);

type Params = {
	location: string;
};

export function getWeatherData({ location }: Params): Promise<Weather> {
	const URL = `${API_URL}?appid=${API_KEY}&q=${location}&units=metric`;

	return fetch(URL).then((res) => res.json());
}
