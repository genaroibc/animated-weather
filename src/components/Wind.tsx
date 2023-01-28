import { WeatherWind } from '../types/api-reponse';
import { CompositionLayout } from './shared/CompositionLayout';

const getWindSpeedMessage = (speed: number) => {
	if (speed < 1) {
		return 'Very slow!';
	}

	if (speed < 3) {
		return 'How fast!';
	}
};

type Props = WeatherWind;

export function Wind({ deg, speed }: Props) {
	return (
		<CompositionLayout>
			<h4 className="text-6xl">Wind</h4>
			<span>
				The wind speed is {speed} in {deg} degrees
			</span>
			<span>{getWindSpeedMessage(speed)} 💨</span>
		</CompositionLayout>
	);
}
