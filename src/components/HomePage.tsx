import { Hero } from '@/components/Hero';
import { VideoSection } from '@/components/VideoSection';

type Props = {
  initialLocation?: string;
}

export function HomePage({ initialLocation }: Props) {
  console.log({ initialLocation });
  return (
    <main className="p-4 mx-auto flex justify-center flex-col gap-12 text-center">
      <Hero />
      <VideoSection initialLocation={initialLocation} />
    </main>
  );
}
