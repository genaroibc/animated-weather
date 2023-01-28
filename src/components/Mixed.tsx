import { WeatherMain } from '../types/api-reponse';
import { CompositionLayout } from './shared/CompositionLayout';

type Props = WeatherMain;

export function Mixed({ humidity, pressure, grnd_level, sea_level }: Props) {
	return (
		<CompositionLayout>
			<h2 className="text-6xl">Mixed</h2>

			<span>Humidity: {humidity}</span>
			<span>Pressure: {pressure}</span>

			{grnd_level && (
				<span>Atmospheric pressure on the ground: {grnd_level}</span>
			)}
			{sea_level && <span>Atmospheric pressure on the sea: {sea_level}</span>}
		</CompositionLayout>
	);
}
