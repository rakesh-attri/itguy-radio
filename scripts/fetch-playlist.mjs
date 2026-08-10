import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PLAYLIST_URL = 'https://open.spotify.com/embed/playlist/3baEvCyH6pe6LZNiGNuH3D';

function fetch(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
  });
}

async function searchYouTube(query) {
  const body = {
    context: {
      client: {
        clientName: 'WEB',
        clientVersion: '2.20240101.00.00',
        hl: 'en',
        gl: 'US',
      },
    },
    query,
    params: 'EgIQAQ%3D%3D',
  };

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const options = {
      hostname: 'www.youtube.com',
      path: '/youtubei/v1/search?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const contents = json?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents;
          if (!contents) return resolve(null);

          for (const item of contents) {
            const video = item.videoRenderer;
            if (video && video.lengthText) {
              const durationText = video.lengthText.simpleText || '';
              const parts = durationText.split(':').map(Number);
              const totalSeconds = parts.length === 2 ? parts[0] * 60 + parts[1] : parts[0] * 3600 + parts[1] * 60 + parts[2];

              if (totalSeconds > 120) {
                resolve({
                  videoId: video.videoId,
                  title: video.title?.runs?.[0]?.text || '',
                  channel: video.ownerText?.runs?.[0]?.text || '',
                  duration: durationText,
                });
                return;
              }
            }
          }
          resolve(null);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log('Fetching Spotify playlist embed page...');
  const html = await fetch(PLAYLIST_URL);

  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
  if (!match) {
    console.error('Could not find __NEXT_DATA__ in embed page');
    process.exit(1);
  }

  const nextData = JSON.parse(match[1]);
  const state = nextData?.props?.pageProps?.state;
  const entity = state?.data?.entity;

  if (!entity) {
    console.error('Could not parse playlist entity');
    process.exit(1);
  }

  const trackList = entity.trackList || [];
  console.log(`Found ${trackList.length} tracks in playlist "${entity.name}"`);

  if (trackList.length > 0) {
    console.log('\nSample track structure:');
    console.log(JSON.stringify(Object.keys(trackList[0]), null, 2));
    console.log('Sample track:', JSON.stringify(trackList[0], null, 2));
  }

  const songs = [];

  for (let i = 0; i < trackList.length; i++) {
    const track = trackList[i];
    const title = track.title || track.name || '';
    const artists = track.subtitle || (track.artists || []).map((a) => a.name || a).join(', ') || '';
    const album = track.album?.name || track.album || '';
    const durationMs = track.duration || track.duration?.total || 0;
    const duration = typeof durationMs === 'number' ? Math.floor(durationMs / 1000) : durationMs;
    const previewUrl = track.audioPreview?.url || null;
    const coverUrl = track.album?.coverArt?.sources?.[0]?.url || track.imageSrc || null;
    const trackId = track.id || track.uid || '';
    const spotifyUrl = track.uri || `https://open.spotify.com/track/${trackId}`;

    const searchQuery = title && artists && artists !== 'Unknown' ? `${title} ${artists} official` : title ? `${title} official` : previewUrl;
    console.log(`\n[${i + 1}/${trackList.length}] "${searchQuery}"`);

    let youtubeResult = null;
    try {
      youtubeResult = await searchYouTube(searchQuery);
    } catch (e) {
      console.log(`  Search failed: ${e.message}`);
    }

    if (youtubeResult) {
      console.log(`  -> ${youtubeResult.title} (${youtubeResult.videoId})`);
    } else {
      console.log(`  -> No result found`);
    }

    const ytCoverUrl = youtubeResult?.videoId
      ? `https://img.youtube.com/vi/${youtubeResult.videoId}/mqdefault.jpg`
      : null;

    songs.push({
      id: i + 1,
      title: title || `Track ${i + 1}`,
      artist: artists || 'Unknown',
      album: album || '',
      duration,
      previewUrl,
      coverUrl: coverUrl || ytCoverUrl,
      youtubeId: youtubeResult?.videoId || null,
      youtubeTitle: youtubeResult?.title || null,
      spotifyUrl,
    });

    if (i < trackList.length - 1) {
      await sleep(1200);
    }
  }

  const outputPath = path.join(process.cwd(), 'src', 'lib', 'songs.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(songs, null, 2));
  console.log(`\nSaved ${songs.length} songs to ${outputPath}`);

  const withYoutube = songs.filter((s) => s.youtubeId).length;
  const withPreview = songs.filter((s) => s.previewUrl).length;
  console.log(`\nSummary:`);
  console.log(`  With YouTube video: ${withYoutube}/${songs.length}`);
  console.log(`  With Spotify preview: ${withPreview}/${songs.length}`);
}

main().catch(console.error);
