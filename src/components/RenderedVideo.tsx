type Props = {
	src: string;
};

export function RenderedVideo({ src }: Props) {
	return (
		<>
			<video autoPlay controls width={400} height={400} src={src} />
			<a download href={src}>
				Download video
			</a>
		</>
	);
}
