/**
 * TRUE Autoplay Music for "My 9th Astronomer" Website
 * This will play automatically without user interaction
 */

// Create audio element with autoplay attributes
const audio = new Audio();
audio.src = 'music/background-music.mp3';
audio.volume = 0.3;
audio.loop = true;
audio.autoplay = true;
audio.muted = false;
audio.preload = 'auto';

// Force autoplay by setting HTML attributes
audio.setAttribute('autoplay', '');
audio.setAttribute('preload', 'auto');

console.log('🎵 Music player initialized with force autoplay');

// Multiple aggressive autoplay attempts
function forceAutoplay() {
    console.log('🎵 Forcing autoplay...');
    
    // Method 1: Direct play
    audio.play().then(() => {
        console.log('🎵 SUCCESS: Music started with direct play!');
        showMessage('🎵 Music Playing Automatically');
    }).catch(() => {
        console.log('🎵 Direct play failed, trying muted start...');
        
        // Method 2: Start muted then unmute
        audio.muted = true;
        audio.play().then(() => {
            console.log('🎵 SUCCESS: Music started muted, unmuting...');
            setTimeout(() => {
                audio.muted = false;
                showMessage('🎵 Music Playing Automatically');
            }, 100);
        }).catch(() => {
            console.log('🎵 Muted start failed, trying volume trick...');
            
            // Method 3: Start with very low volume
            audio.volume = 0.01;
            audio.muted = false;
            audio.play().then(() => {
                console.log('🎵 SUCCESS: Music started with low volume, increasing...');
                // Gradually increase volume
                let vol = 0.01;
                const increaseVolume = setInterval(() => {
                    vol += 0.02;
                    if (vol >= 0.3) {
                        vol = 0.3;
                        clearInterval(increaseVolume);
                    }
                    audio.volume = vol;
                }, 50);
                showMessage('🎵 Music Playing Automatically');
            }).catch(() => {
                console.log('🎵 All autoplay methods failed');
                showMessage('🎵 Click anywhere to start music');
                setupInteractionStart();
            });
        });
    });
}

// Quick user interaction fallback
function setupInteractionStart() {
    const quickStart = () => {
        audio.muted = false;
        audio.volume = 0.3;
        audio.play().then(() => {
            console.log('🎵 Music started after interaction');
            showMessage('🎵 Music Playing');
        });
    };
    
    // Start on ANY interaction
    document.addEventListener('click', quickStart, { once: true });
    document.addEventListener('scroll', quickStart, { once: true });
    document.addEventListener('keydown', quickStart, { once: true });
    document.addEventListener('mousemove', quickStart, { once: true });
}

// Show status message
function showMessage(text) {
    const existing = document.querySelector('.music-message');
    if (existing) existing.remove();
    
    const message = document.createElement('div');
    message.className = 'music-message';
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-family: 'Playfair Display', serif;
        font-size: 16px;
        z-index: 1000;
        pointer-events: none;
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(message);
    
    if (!text.includes('Click')) {
        setTimeout(() => message.remove(), 3000);
    }
}

// Audio events
audio.addEventListener('loadstart', () => console.log('🎵 Loading...'));
audio.addEventListener('canplay', () => {
    console.log('🎵 Audio ready, forcing play...');
    forceAutoplay();
});
audio.addEventListener('play', () => console.log('🎵 ✅ PLAYING!'));
audio.addEventListener('error', (e) => console.log('🎵 Error:', e));

// Start immediately
console.log('🎵 Starting autoplay sequence...');
forceAutoplay();

// Try again when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 DOM loaded, trying autoplay again...');
    setTimeout(forceAutoplay, 200);
});

// And try again when window loads
window.addEventListener('load', () => {
    console.log('🎵 Window loaded, final autoplay attempt...');
    setTimeout(forceAutoplay, 500);
});
