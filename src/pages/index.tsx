import { Hero } from '@/components/Hero';
import { VideoSection } from '@/components/VideoSection';
import { useEffect, useState } from 'react';

export default function Home() {
	const [videoConfig, setVideoConfig] = useState<{ src: string } | null>();

	useEffect(() => {
		fetch('/api/render')
			.then((response) => {
				return response.blob();
			})
			.then((blob) => {
				const videoUrl = URL.createObjectURL(blob);

				setVideoConfig({ src: videoUrl });
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<main className="mx-auto my-4 flex justify-center flex-col gap-4 text-center">
			<Hero />
			<VideoSection />

			{videoConfig && (
				<>
					<video autoPlay controls src={videoConfig.src} />
					<a download href={videoConfig.src}>
						Download video
					</a>
				</>
			)}
		</main>
	);
}
