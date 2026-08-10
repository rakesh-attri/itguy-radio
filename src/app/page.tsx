import Clock from '@/components/Clock';
import Links from '@/components/Links';
import Logo from '@/components/Logo';
import Player from '@/components/Player';

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <div className="hero-bg fixed inset-0 -z-10" />

      <Clock />
      <Links />

      <div className="mt-[8vh] sm:mt-[12vh] flex flex-col items-center px-4 sm:px-6">
        <Logo />
      </div>

      <div className="mb-[15vh] sm:mb-[22vh] flex w-full justify-center px-3 sm:px-6">
        <Player />
      </div>
    </main>
  );
}
