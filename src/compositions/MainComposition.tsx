import { Sequence, useVideoConfig } from 'remotion';
import { Temperature } from '../components/Temperature';
import { Title } from '../components/Welcome';
import { Wind } from '../components/Wind';
import { Weather } from '../types/api-reponse';

type Props = Weather;

export function MainComposition({ name, main, wind }: Props) {
	const { width } = useVideoConfig();

	return (
		<>
			<style>
				{`
           :root {
            font-size: ${0.025 * width}px;
            color: #fff;
          }
        `}
			</style>

			<Sequence>
				<Title city={name} />
			</Sequence>

			<Sequence from={120}>
				<Temperature {...main} />
			</Sequence>

			<Sequence from={280}>
				<Wind {...wind} />
			</Sequence>
		</>
	);
}
