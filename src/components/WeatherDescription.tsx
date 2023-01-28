import { Img } from 'remotion';
import { WeatherItem } from '../types/api-reponse';
import { CompositionLayout } from './shared/CompositionLayout';

type Props = WeatherItem;

export function WeatherDescription({ description, icon, main }: Props) {
	return (
		<CompositionLayout>
			<h2 className="text-6xl">Status</h2>

			<div className="flex flex-col justify-center items-center gap-3 p-3 rounded">
				<div>
					<h3>{main}</h3>
					<Img
						src={`${process.env.NEXT_PUBLIC_ICONS_URL}?icon=${icon}`}
						alt=""
					/>
				</div>
				<p>{description}</p>
			</div>
		</CompositionLayout>
	);
}
