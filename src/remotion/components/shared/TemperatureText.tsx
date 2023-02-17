type Props = {
	content: string;
	degrees: number;
};

export function TemperatureText({ content, degrees }: Props) {
	return (
		<span
			style={{
				background: `url(/${degrees > 20 ? 'fire' : 'ice'}.jpg)`,
				WebkitBackgroundClip: 'text',
				backgroundClip: 'text',
			}}
			className="cold"
			data-heading={content}
		>
			{content}
		</span>
	);
}
