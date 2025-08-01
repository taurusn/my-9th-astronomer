/**
 * HTML Button Music Player for "My 9th Astronomer" Website
 * Works with the HTML music button and waits for any user interaction
 */

// Detect if device is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Create audio element
const audio = new Audio();
audio.src = 'music/background-music.mp3';
audio.volume = 0.3;
audio.loop = true;
audio.preload = 'auto';

// Get the music control button from HTML
let musicButton = null;
let isPlaying = false;

console.log('🎵 Music player initialized - Mobile:', isMobile);

// Initialize music controls
function initializeMusicControls() {
    musicButton = document.getElementById('musicControlBtn');
    
    if (musicButton) {
        // Set up click handler for the button
        musicButton.addEventListener('click', toggleMusic);
        console.log('🎵 Music button connected');
    }
    
    // Set up global listeners that work forever
    setupGlobalListeners();
    
    // Try autoplay on desktop
    if (!isMobile) {
        attemptDesktopAutoplay();
    }
}

// Set up listeners that never expire and work forever
function setupGlobalListeners() {
    console.log('🎵 Setting up global listeners that work forever...');
    
    // These listeners never get removed and always work
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('mousemove', handleUserInteraction);
    
    console.log('🎵 Global listeners active - music will start on ANY interaction');
}

// Handle any user interaction
function handleUserInteraction(event) {
    if (!isPlaying) {
        console.log('🎵 User interaction detected:', event.type);
        startMusic();
    }
}

// Toggle music on button click
function toggleMusic() {
    if (isPlaying) {
        pauseMusic();
    } else {
        startMusic();
    }
}

// Start the music
function startMusic() {
    audio.muted = false;
    audio.volume = 0.3;
    
    audio.play().then(() => {
        isPlaying = true;
        updateButtonState();
        console.log('🎵 Music started successfully!');
        showMessage('🎵 Music Playing', 2000);
    }).catch((error) => {
        console.log('🎵 Cannot start music:', error);
        showMessage('❌ Cannot play music', 3000);
    });
}

// Pause the music
function pauseMusic() {
    audio.pause();
    isPlaying = false;
    updateButtonState();
    console.log('🎵 Music paused');
    showMessage('🎵 Music Paused', 2000);
}

// Update button appearance
function updateButtonState() {
    if (!musicButton) return;
    
    const icon = musicButton.querySelector('.music-icon');
    const text = musicButton.querySelector('.music-text');
    
    if (isPlaying) {
        musicButton.classList.add('playing');
        if (icon) icon.textContent = '⏸️';
        if (text) text.textContent = 'Pause';
    } else {
        musicButton.classList.remove('playing');
        if (icon) icon.textContent = '🎵';
        if (text) text.textContent = 'Play Music';
    }
}

// Try autoplay on desktop
function attemptDesktopAutoplay() {
    console.log('🎵 Attempting desktop autoplay...');
    
    audio.play().then(() => {
        isPlaying = true;
        updateButtonState();
        console.log('🎵 Desktop autoplay successful!');
        showMessage('🎵 Music Playing Automatically', 2000);
    }).catch(() => {
        console.log('🎵 Desktop autoplay blocked - waiting for user interaction');
        showMessage('🎵 Click anywhere or use the play button to start music', 0);
    });
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
        top: 80px;
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
    
    // Only auto-remove if duration > 0
    if (duration > 0) {
        setTimeout(() => message.remove(), duration);
    }
}

// Audio events
audio.addEventListener('loadstart', () => console.log('🎵 Loading...'));
audio.addEventListener('canplay', () => console.log('🎵 Audio ready'));
audio.addEventListener('play', () => console.log('🎵 ✅ PLAYING!'));
audio.addEventListener('pause', () => console.log('🎵 ⏸️ PAUSED'));
audio.addEventListener('error', (e) => console.log('🎵 Error:', e));

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 DOM loaded, initializing music controls...');
    initializeMusicControls();
});

// Also initialize if DOM is already loaded
if (document.readyState !== 'loading') {
    console.log('🎵 DOM already loaded, initializing immediately...');
    initializeMusicControls();
}
