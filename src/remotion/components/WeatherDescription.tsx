import { WeatherItem } from '../../types/api-reponse';
import { CompositionLayout } from './shared/CompositionLayout';
import { WeatherPicture } from './shared/WeatherPicture';

type Props = WeatherItem;

export function WeatherDescription({ description, icon, main }: Props) {
	return (
		<CompositionLayout from="top" to="bottom" title="Status">
			<div className="flex flex-col justify-center items-center gap-3 p-3 rounded">
				<div>
					<h3>{main}</h3>
					<WeatherPicture
						src={`${process.env.NEXT_PUBLIC_ICONS_URL}/${icon}.png`}
					/>
				</div>
				<p>{description}</p>
			</div>
		</CompositionLayout>
	);
}
