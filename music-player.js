/**
 * Mobile-Friendly Autoplay Music for "My 9th Astronomer" Website
 * Works on both desktop and mobile devices
 */

// Detect if device is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Create audio element
const audio = new Audio();
audio.src = 'music/background-music.mp3';
audio.volume = 0.3;
audio.loop = true;
audio.preload = 'auto';

console.log('🎵 Music player initialized - Mobile:', isMobile);

// Mobile-friendly autoplay function
function attemptAutoplay() {
    console.log('🎵 Attempting autoplay...');
    
    if (isMobile) {
        // On mobile, show a prominent play button
        showMobilePlayButton();
        showMessage('🎵 Tap the play button to start music');
    } else {
        // On desktop, try aggressive autoplay
        forceDesktopAutoplay();
    }
}

// Desktop autoplay with multiple methods
function forceDesktopAutoplay() {
    audio.play().then(() => {
        console.log('🎵 SUCCESS: Desktop autoplay worked!');
        showMessage('🎵 Music Playing Automatically');
    }).catch(() => {
        console.log('🎵 Desktop autoplay failed, trying muted start...');
        
        // Try muted start then unmute
        audio.muted = true;
        audio.play().then(() => {
            console.log('🎵 SUCCESS: Muted start worked, unmuting...');
            setTimeout(() => {
                audio.muted = false;
                showMessage('🎵 Music Playing Automatically');
            }, 100);
        }).catch(() => {
            console.log('🎵 All autoplay failed, showing interaction prompt');
            showMessage('🎵 Click anywhere to start music');
            setupInteractionStart();
        });
    });
}

// Show prominent play button for mobile
function showMobilePlayButton() {
    // Remove existing button
    const existing = document.querySelector('.mobile-play-button');
    if (existing) existing.remove();
    
    const playButton = document.createElement('div');
    playButton.className = 'mobile-play-button';
    playButton.innerHTML = `
        <div class="play-icon">▶️</div>
        <div class="play-text">Tap to Play Music</div>
    `;
    
    playButton.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        font-family: 'Playfair Display', serif;
        font-size: 18px;
        z-index: 10000;
        cursor: pointer;
        border: 2px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease;
    `;
    
    // Add hover effect for mobile
    playButton.addEventListener('touchstart', () => {
        playButton.style.transform = 'translate(-50%, -50%) scale(0.95)';
        playButton.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    
    playButton.addEventListener('touchend', () => {
        playButton.style.transform = 'translate(-50%, -50%) scale(1)';
        playButton.style.background = 'rgba(0, 0, 0, 0.9)';
    });
    
    playButton.addEventListener('click', () => {
        startMobileMusic();
        playButton.remove();
    });
    
    document.body.appendChild(playButton);
}

// Start music on mobile
function startMobileMusic() {
    audio.muted = false;
    audio.volume = 0.3;
    
    audio.play().then(() => {
        console.log('🎵 Mobile music started successfully!');
        showMessage('🎵 Music Playing', 2000);
    }).catch((error) => {
        console.log('🎵 Mobile music failed:', error);
        showMessage('❌ Cannot play music on this device', 3000);
    });
}

// Desktop interaction fallback
function setupInteractionStart() {
    const quickStart = (event) => {
        console.log('🎵 User interaction detected:', event.type);
        audio.muted = false;
        audio.volume = 0.3;
        audio.play().then(() => {
            console.log('🎵 Music started after interaction');
            showMessage('🎵 Music Playing', 2000);
            // Remove listeners
            document.removeEventListener('click', quickStart);
            document.removeEventListener('scroll', quickStart);
            document.removeEventListener('keydown', quickStart);
        });
    };
    
    document.addEventListener('click', quickStart, { once: true });
    document.addEventListener('scroll', quickStart, { once: true });
    document.addEventListener('keydown', quickStart, { once: true });
}

// Show status message
function showMessage(text, duration = 3000) {
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
    
    if (!text.includes('Click') && !text.includes('Tap')) {
        setTimeout(() => message.remove(), duration);
    }
}

// Audio events
audio.addEventListener('loadstart', () => console.log('🎵 Loading...'));
audio.addEventListener('canplay', () => {
    console.log('🎵 Audio ready, starting appropriate play method...');
    attemptAutoplay();
});
audio.addEventListener('play', () => console.log('🎵 ✅ PLAYING!'));
audio.addEventListener('error', (e) => console.log('🎵 Error:', e));

// Start immediately
console.log('🎵 Starting music player...');
attemptAutoplay();

// Try again when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 DOM loaded, trying autoplay again...');
    setTimeout(attemptAutoplay, 200);
});

// And try again when window loads
window.addEventListener('load', () => {
    console.log('🎵 Window loaded, final autoplay attempt...');
    setTimeout(attemptAutoplay, 500);
});
