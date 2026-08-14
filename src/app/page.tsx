import Clock from '@/components/Clock';
import Links from '@/components/Links';
import Player from '@/components/Player';
import Visualizer from '@/components/Visualizer';

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <div className="hero-bg fixed inset-0 -z-10" />

      <Clock />
      <Links />

      {/* Visualizer in middle of page */}
      <div className="flex w-full max-w-2xl justify-center px-4 sm:px-6">
        <Visualizer barCount={48} />
      </div>

      <div className="mb-[15vh] sm:mb-[22vh] flex w-full justify-center px-3 sm:px-6">
        <Player />
      </div>
    </main>
  );
}
