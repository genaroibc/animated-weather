import { HomePage } from '@/components/HomePage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const [ location, setLocation ] = useState<string | null>(null);

  const router = useRouter()


  useEffect(() => {
    if (!router.isReady) return

    let cleanLocation: string | null | undefined = null;

    if (Array.isArray(router.query.location)) {
      cleanLocation = router.query.location[ 0 ]
    } else {
      cleanLocation = router.query.location
    }

    setLocation(cleanLocation ?? null);
  }, [ router ])

  return (
    location ?
      < HomePage initialLocation={router.query.location as string} />
      : "Loading..."
  )
}