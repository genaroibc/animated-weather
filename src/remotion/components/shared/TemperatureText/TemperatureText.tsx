import styles from './TemperatureText.module.css';

type Props = {
	content: string;
	degrees: number;
};

export function TemperatureText({ content, degrees }: Props) {
	const bgImageUrl = `/img/${degrees > 20 ? 'fire' : 'ice'}.jpg`;

	return (
		<span
			style={{
				background: `url(${bgImageUrl})`,
				WebkitBackgroundClip: 'text',
				backgroundClip: 'text',
			}}
			className={styles.temperatureText}
			data-heading={content}
		>
			{content}
		</span>
	);
}
