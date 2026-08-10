'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import songs from '@/lib/songs.json';

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  previewUrl: string | null;
  coverUrl: string | null;
  youtubeId: string | null;
  youtubeTitle: string | null;
  spotifyUrl: string;
}

interface PlayerState {
  ready: boolean;
  playing: boolean;
  started: boolean;
  currentTime: number;
  duration: number;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

let ytApiPromise: Promise<typeof window.YT> | null = null;

function loadYtApi(): Promise<typeof window.YT> {
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      originalCallback?.();
      resolve(window.YT);
    };
  });

  return ytApiPromise;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Player() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerState, setPlayerState] = useState<PlayerState>({
    ready: false,
    playing: false,
    started: false,
    currentTime: 0,
    duration: 0,
  });

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startedRef = useRef(false);

  const currentSong = songs[currentIndex] as Song;

  const startProgressTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const player = playerRef.current;
      if (player && typeof player.getCurrentTime === 'function') {
        setPlayerState((prev) => ({
          ...prev,
          currentTime: player.getCurrentTime() || 0,
          duration: player.getDuration() || 0,
        }));
      }
    }, 400);
  }, []);

  const stopProgressTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const initPlayer = useCallback(async () => {
    if (playerRef.current) return;

    try {
      const YT = await loadYtApi();
      if (!containerRef.current || playerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        height: '200',
        width: '200',
        videoId: currentSong.youtubeId || undefined,
        playerVars: {
          controls: 0,
          disablekb: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          start: 5,
        },
        events: {
          onReady: () => {
            setPlayerState((prev) => ({ ...prev, ready: true }));
            playerRef.current?.setVolume(75);
          },
          onStateChange: (event: any) => {
            const state = event.data;
            if (state === YT.PlayerState.PLAYING) {
              setPlayerState((prev) => ({ ...prev, playing: true }));
              startProgressTracking();
            } else if (state === YT.PlayerState.PAUSED) {
              setPlayerState((prev) => ({ ...prev, playing: false }));
              stopProgressTracking();
            } else if (state === YT.PlayerState.ENDED) {
              setPlayerState((prev) => ({ ...prev, playing: false }));
              stopProgressTracking();
              setCurrentIndex((prev) => (prev + 1) % songs.length);
            }
          },
        },
      });
    } catch (error) {
      console.error('Failed to load YouTube API:', error);
    }
  }, [currentSong.youtubeId, startProgressTracking, stopProgressTracking]);

  useEffect(() => {
    initPlayer();
    return () => {
      stopProgressTracking();
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!playerRef.current || !playerState.ready) return;
    if (!startedRef.current) return;

    playerRef.current.loadVideoById({
      videoId: currentSong.youtubeId,
      startSeconds: 5,
    });
  }, [currentIndex, playerState.ready, currentSong.youtubeId]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    if (playerState.playing) {
      player.pauseVideo();
    } else {
      startedRef.current = true;
      player.playVideo();
    }
  }, [playerState.playing]);

  const playNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  }, []);

  const playPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  }, []);

  const seekTo = useCallback((fraction: number) => {
    const player = playerRef.current;
    if (!player) return;
    const duration = player.getDuration();
    if (duration) {
      player.seekTo(duration * fraction, true);
    }
  }, []);

  const progress = playerState.duration > 0 ? playerState.currentTime / playerState.duration : 0;

  return (
    <div className="w-full max-w-xl">
      <div ref={containerRef} className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" />

      <div className="glass group relative flex items-center gap-4 rounded-full p-3 pr-5">
        <div className="relative h-20 w-20 shrink-0">
          <div
            className="h-full w-full overflow-hidden rounded-full shadow-lg ring-1 ring-white/20"
            style={{
              animation: playerState.playing ? 'spin-slow 8s linear infinite' : 'none',
            }}
          >
            {currentSong.coverUrl ? (
              <img
                src={currentSong.coverUrl}
                alt={`${currentSong.title} artwork`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-green-500 via-blue-600 to-purple-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="opacity-90">
                  <path d="M12 3v10.55A4 4 0 1014 17V7h4V3z" />
                </svg>
              </div>
            )}
          </div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-white drop-shadow-sm">{currentSong.title}</p>
          <p className="truncate text-[13px] text-white/70">{currentSong.artist || currentSong.album}</p>
          <div className="mt-2">
            <div
              className="seek-bar group/bar relative h-2 w-full cursor-pointer"
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                seekTo(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
              }}
            >
              <div className="progress-bar absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full">
                <div className="progress-bar-fill h-full rounded-full" style={{ width: `${progress * 100}%` }} />
              </div>
              <div
                className="seek-thumb absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow"
                style={{ left: `${progress * 100}%` }}
              />
            </div>
            <div className="mt-1.5 text-left text-[11px] tabular-nums text-white/60">
              {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous track"
            onClick={playPrev}
            className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={playerState.playing ? 'Pause' : 'Play'}
            aria-pressed={playerState.playing}
            onClick={togglePlay}
            disabled={!playerState.ready}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {playerState.playing ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            aria-label="Next track"
            onClick={playNext}
            className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6h2v12h-2zm-2 6L5.5 6v12z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
