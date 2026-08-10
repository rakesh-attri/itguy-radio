export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-[#00a1e0]/20 blur-3xl rounded-full" />
        <div className="glass rounded-2xl px-10 py-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#00a1e0] font-mono text-xs opacity-60">$</span>
            <span className="text-white/40 font-mono text-xs">now-playing</span>
          </div>

          {/* Salesforce Cloud Icon */}
          <div className="mb-2">
            <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M38.5 14C38.5 8.5 34 4 28.5 4C24.5 4 21 6.5 19.5 10C18.5 9.5 17.5 9 16.5 9C12.4 9 9 12.4 9 16.5C9 17 9.1 17.5 9.2 18C5.7 18.5 3 21.5 3 25C3 28.9 6.1 32 10 32H38C41.9 32 45 28.9 45 25C45 21.5 42.3 18.5 38.8 18C38.6 17.5 38.5 17 38.5 16.5V14Z"
                fill="url(#cloud-gradient)"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="cloud-gradient" x1="3" y1="4" x2="45" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00a1e0"/>
                  <stop offset="1" stopColor="#0070d2"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight">
            <span className="bg-gradient-to-r from-[#00a1e0] via-[#009edb] to-[#0070d2] bg-clip-text text-transparent">
              Salesforce QA
            </span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-[#00a1e0] font-mono text-sm">{`>`}</span>
            <span className="text-[#00a1e0] font-mono text-sm tracking-widest">MUSIC</span>
            <span className="inline-block w-2 h-5 bg-[#00a1e0] animate-[blink_1s_step-end_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}
