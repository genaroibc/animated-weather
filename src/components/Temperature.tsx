// import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { TEMPERATURE_UNIT } from '../constants';
import { WeatherMain } from '../types/api-reponse';
import { CompositionLayout } from './shared/CompositionLayout';

type Props = WeatherMain;

export function Temperature({ feels_like, temp, temp_max, temp_min }: Props) {
	// const frame = useCurrentFrame();
	// const { fps } = useVideoConfig();

	// const scale = spring({
	// 	fps,
	// 	frame,
	// });
	//  style={{
	// 				// 	transform: `scale(${scale})`,
	// 				// }}

	return (
		<CompositionLayout>
			<h4 className="text-6xl">Temperature</h4>

			<span>The temperature is {temp} </span>

			<span>It feels like: {`${feels_like} ${TEMPERATURE_UNIT}`}</span>

			<div className="flex gap-3">
				<span>Min: {temp_min}</span>
				<span>Max: {temp_max}</span>
			</div>
		</CompositionLayout>
	);
}
