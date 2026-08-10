export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
        <div className="glass rounded-2xl px-8 py-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-green-500 font-mono text-xs opacity-60">$</span>
            <span className="text-white/40 font-mono text-xs">now-playing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-mono tracking-tight">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              IT GUY
            </span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">{`>`}</span>
            <span className="text-green-400 font-mono text-sm tracking-widest">RADIO</span>
            <span className="inline-block w-2 h-5 bg-green-400 animate-[blink_1s_step-end_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}
