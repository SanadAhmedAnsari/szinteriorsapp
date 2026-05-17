import { Youtube, Instagram, ExternalLink } from 'lucide-react';

interface Props {
  url: string;
  title?: string;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function extractInstagramShortcode(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:p|reel|reels)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

export function detectPlatform(url: string): 'youtube' | 'instagram' | 'unknown' {
  if (extractYouTubeId(url)) return 'youtube';
  if (extractInstagramShortcode(url)) return 'instagram';
  return 'unknown';
}

export default function VideoEmbed({ url, title }: Props) {
  const youtubeId = extractYouTubeId(url);
  const instagramShortcode = extractInstagramShortcode(url);

  if (youtubeId) {
    return (
      <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&autoplay=1`}
          title={title ?? 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  if (instagramShortcode) {
    return (
      <div className="mx-auto w-full max-w-sm">
        <div className="relative bg-black rounded-2xl overflow-hidden" style={{ aspectRatio: '9/16' }}>
          <iframe
            src={`https://www.instagram.com/reel/${instagramShortcode}/embed/`}
            title={title ?? 'Instagram reel'}
            scrolling="no"
            allowTransparency
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-700 transition-colors"
        >
          <Instagram size={12} />
          <span>Open on Instagram</span>
          <ExternalLink size={10} />
        </a>
      </div>
    );
  }

  // Fallback for unrecognised URLs
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 rounded-2xl bg-stone-100 p-8 text-sm font-bold uppercase tracking-widest text-stone-500 hover:bg-stone-200 transition-colors"
    >
      <ExternalLink size={18} />
      <span>Watch Video</span>
    </a>
  );
}

export function PlatformBadge({ url }: { url: string }) {
  const platform = detectPlatform(url);
  if (platform === 'youtube') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-red-600">
        <Youtube size={10} />
        YouTube
      </span>
    );
  }
  if (platform === 'instagram') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-purple-600">
        <Instagram size={10} />
        Instagram
      </span>
    );
  }
  return null;
}
