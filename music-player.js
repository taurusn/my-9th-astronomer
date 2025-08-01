/**
 * Always-Ready Music Player for "My 9th Astronomer" Website
 * Waits forever for user interaction, then plays non-stop
 */

// Detect if device is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Create audio element
const audio = new Audio();
audio.src = 'music/background-music.mp3';
audio.volume = 0.3;
audio.loop = true;
audio.preload = 'auto';

let musicStarted = false;
let musicReady = false;

console.log('🎵 Music player initialized - Mobile:', isMobile);

// Setup permanent listeners that never get removed
function setupPermanentListeners() {
    console.log('🎵 Setting up permanent interaction listeners...');
    
    const startMusic = (event) => {
        if (!musicStarted) {
            console.log('🎵 User interaction detected:', event.type);
            playMusicNow();
        }
    };
    
    // Add ALL possible interaction events that NEVER get removed
    document.addEventListener('click', startMusic);
    document.addEventListener('touchstart', startMusic);
    document.addEventListener('touchend', startMusic);
    document.addEventListener('scroll', startMusic);
    document.addEventListener('wheel', startMusic);
    document.addEventListener('keydown', startMusic);
    document.addEventListener('keyup', startMusic);
    document.addEventListener('mousemove', startMusic);
    document.addEventListener('mousedown', startMusic);
    document.addEventListener('mouseup', startMusic);
    
    // Also listen on window for extra coverage
    window.addEventListener('click', startMusic);
    window.addEventListener('scroll', startMusic);
    window.addEventListener('touchstart', startMusic);
    
    console.log('🎵 Permanent listeners active - waiting for ANY interaction...');
}

// Play music immediately when called
function playMusicNow() {
    if (musicStarted) return; // Prevent multiple starts
    
    musicStarted = true;
    console.log('🎵 Starting music NOW!');
    
    // Remove any existing mobile play button
    const mobileButton = document.querySelector('.mobile-play-button');
    if (mobileButton) mobileButton.remove();
    
    // Remove any existing messages
    const existingMessage = document.querySelector('.music-message');
    if (existingMessage) existingMessage.remove();
    
    // Force play with all possible methods
    audio.muted = false;
    audio.volume = 0.3;
    
    audio.play().then(() => {
        console.log('🎵 ✅ MUSIC PLAYING NON-STOP!');
        showMessage('🎵 Music Playing', 2000);
        
        // Ensure it keeps playing forever
        ensureContinuousPlay();
        
    }).catch((error) => {
        console.log('🎵 First attempt failed, trying muted start...', error);
        
        // Fallback: start muted then unmute
        audio.muted = true;
        audio.play().then(() => {
            console.log('🎵 Muted start successful, unmuting...');
            setTimeout(() => {
                audio.muted = false;
                audio.volume = 0.3;
                showMessage('🎵 Music Playing', 2000);
                ensureContinuousPlay();
            }, 100);
        }).catch((err) => {
            console.log('🎵 ❌ All methods failed:', err);
            showMessage('❌ Cannot play music on this device', 5000);
        });
    });
}

// Ensure music never stops playing
function ensureContinuousPlay() {
    // Monitor audio and restart if it stops
    audio.addEventListener('ended', () => {
        console.log('🎵 Music ended, restarting...');
        setTimeout(() => audio.play(), 100);
    });
    
    audio.addEventListener('pause', () => {
        console.log('🎵 Music paused, resuming...');
        setTimeout(() => audio.play(), 100);
    });
    
    // Check every 5 seconds to ensure music is still playing
    setInterval(() => {
        if (musicStarted && audio.paused && !audio.ended) {
            console.log('🎵 Music stopped unexpectedly, restarting...');
            audio.play().catch(() => console.log('🎵 Restart failed'));
        }
    }, 5000);
}

// Show mobile play button if on mobile
function showMobileHint() {
    if (!isMobile) return;
    
    const hint = document.createElement('div');
    hint.className = 'mobile-music-hint';
    hint.innerHTML = `
        <div class="hint-icon">🎵</div>
        <div class="hint-text">Tap anywhere to start music</div>
    `;
    
    hint.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        text-align: center;
        font-family: 'Playfair Display', serif;
        font-size: 16px;
        z-index: 10000;
        border: 1px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        animation: pulse 2s infinite;
    `;
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
            50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(hint);
    
    // Remove hint when music starts
    const removeHint = () => {
        if (musicStarted && hint.parentNode) {
            hint.remove();
        }
    };
    
    setInterval(removeHint, 1000);
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
    
    // Remove message automatically only if duration > 0
    if (duration > 0) {
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, duration);
    }
    
    // Remove message when music starts
    const removeOnStart = () => {
        if (musicStarted && message.parentNode) {
            message.remove();
        }
    };
    setInterval(removeOnStart, 500);
}

// Audio events
audio.addEventListener('loadstart', () => {
    console.log('🎵 Loading audio...');
});

audio.addEventListener('canplay', () => {
    console.log('🎵 Audio ready to play');
    musicReady = true;
});

audio.addEventListener('loadeddata', () => {
    console.log('🎵 Audio data loaded');
    musicReady = true;
});

audio.addEventListener('play', () => console.log('🎵 ✅ AUDIO PLAYING!'));
audio.addEventListener('error', (e) => console.log('🎵 Audio error:', e));

// Initialize everything immediately
console.log('🎵 Initializing always-ready music player...');
setupPermanentListeners();

// Show mobile hint if on mobile device
if (isMobile) {
    showMobileHint();
} else {
    showMessage('🎵 Click or scroll anywhere to start music', 0); // 0 = never auto-remove
}

// Also setup when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 DOM loaded - listeners still active');
    setupPermanentListeners(); // Make sure listeners are active
});

// And when window loads
window.addEventListener('load', () => {
    console.log('🎵 Window loaded - ready for interaction');
    setupPermanentListeners(); // Ensure listeners are definitely active
});
