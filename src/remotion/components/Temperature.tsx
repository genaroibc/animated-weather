import { TEMPERATURE_UNIT } from '../constants';
import { WeatherMain } from '../../types/api-reponse';
import { CompositionLayout } from './shared/CompositionLayout';

type Props = WeatherMain;

export function Temperature({ feels_like, temp, temp_max, temp_min }: Props) {
	return (
		<CompositionLayout to="bottom" title="Temperature">
			<span>The temperature is {temp} </span>

			<span>It feels like: {`${feels_like} ${TEMPERATURE_UNIT}`}</span>

			<div className="flex gap-3">
				<span>Min: {temp_min}</span>
				<span>Max: {temp_max}</span>
			</div>
		</CompositionLayout>
	);
}
