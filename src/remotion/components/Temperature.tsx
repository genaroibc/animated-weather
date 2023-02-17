import { TEMPERATURE_UNIT } from '../constants';
import { WeatherMain } from '../../types/api-reponse';
import { CompositionLayout } from './shared/CompositionLayout';
import { useCurrentFrame } from 'remotion';
import { ColdText } from './shared/ColdText';

type Props = WeatherMain;

export function Temperature({ feels_like, temp, temp_max, temp_min }: Props) {
	const frame = useCurrentFrame();

	return (
		<CompositionLayout from="bottom" to="right" title="Temperature">
			<span
				style={{
					clipPath: `circle(${frame * 3.5}%)`,
				}}
			>
				The temperature is{' '}
				<span className="text-4xl">
					<ColdText degrees={temp} content={String(temp)} />
				</span>{' '}
				<span>{TEMPERATURE_UNIT}</span>
			</span>

			<span>It feels like: {`${feels_like} ${TEMPERATURE_UNIT}`}</span>

			<div className="flex gap-3">
				<span>Min: {temp_min}</span>
				<span>Max: {temp_max}</span>
			</div>
		</CompositionLayout>
	);
}
