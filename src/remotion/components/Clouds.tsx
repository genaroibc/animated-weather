import { WeatherClouds } from '../../types/api-reponse';
import { CompositionLayout } from '../components/CompositionLayout';

const getCloudinessMessage = (cloudiness: number) => {
	if (cloudiness < 10) {
		return 'What a sunny day ☀️!';
	}

	if (cloudiness < 30) {
		return 'Some clouds are not bad 🌤️!';
	}

	if (cloudiness < 65) {
		return 'A really cloudy day 🌥️!';
	}

	return "So many clouds that I can't see ☁️!";
};

type Props = WeatherClouds;

export function Clouds({ all: cloudiness }: Props) {
	return (
		<CompositionLayout>
			<h2 className="text-6xl">Clouds</h2>

			<span>Percentage of cloudiness: {cloudiness}%</span>
			<span className="text-xl">{getCloudinessMessage(cloudiness)}</span>
		</CompositionLayout>
	);
}
