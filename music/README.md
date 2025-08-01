# Music Files for "My 9th Astronomer" Website

## Instructions:

1. **Add your music files** to this folder with these names:
   - `background-music.mp3` (primary background music)
   - `ambient-space.mp3` (alternative track 1)
   - `celestial-sounds.mp3` (alternative track 2)

2. **Supported formats:**
   - MP3 (recommended)
   - WAV
   - OGG
   - M4A

3. **Music recommendations:**
   - Ambient/cinematic music works best
   - Instrumental tracks are preferred
   - Keep volume moderate (the player starts at 30% volume)
   - Loop-friendly tracks work well

4. **File size recommendations:**
   - Keep files under 10MB for faster loading
   - 128-320 kbps quality is sufficient for web

## Features:

- **Auto-play**: Music starts when the page loads (if browser allows)
- **Fallback**: If auto-play is blocked, music starts on first user interaction
- **Volume control**: Users can adjust volume or mute
- **Multiple tracks**: Player will try alternative tracks if one fails to load
- **Responsive**: Controls adapt to mobile screens
- **Background play**: Music continues while navigating the site

## Music Player Controls:

The music player appears in the top-right corner with:
- Play/Pause button (🎵/⏸️)
- Volume slider with icon (🔊/🔉/🔇)
- Track name display

## Customization:

You can modify the `music-player.js` file to:
- Change the default volume (currently 30%)
- Add more music files to the array
- Customize the appearance of controls
- Add fade in/out effects
- Change auto-play behavior

## Troubleshooting:

- If music doesn't play, check browser console for errors
- Ensure music files are in the correct format and location
- Some browsers block auto-play - this is normal behavior
- On mobile, user interaction may be required to start music

---

**Note**: Place your music files directly in this folder with the exact names mentioned above for automatic detection.
