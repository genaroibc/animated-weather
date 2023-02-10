import { Weather } from '@/types/api-reponse';
import { isEmptyValue } from './isEmptyValue';

export function isWeatherData(data: unknown): data is Weather {
	return (
		!isEmptyValue(data) &&
		!isEmptyValue(data.coord) &&
		!isEmptyValue(data.weather) &&
		!isEmptyValue(data.base) &&
		!isEmptyValue(data.main) &&
		!isEmptyValue(data.visibility) &&
		!isEmptyValue(data.wind) &&
		!isEmptyValue(data.clouds) &&
		!isEmptyValue(data.dt) &&
		!isEmptyValue(data.sys) &&
		!isEmptyValue(data.timezone) &&
		!isEmptyValue(data.id) &&
		!isEmptyValue(data.name) &&
		!isEmptyValue(data.cod)
	);
}
