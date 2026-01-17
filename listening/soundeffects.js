async function playSuccessSound() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    
    // Ensure context is active (Required for 2026 browser standards)
    if (context.state === 'suspended') {
        await context.resume();
    }

    // Helper to create a lively "ping" note
    const playNote = (freq, startOffset, duration) => {
        const osc = context.createOscillator();
        const gain = context.createGain();

        osc.type = 'triangle'; // Triangle is "livelier/brighter" than sine
        osc.frequency.setValueAtTime(freq, context.currentTime + startOffset);

        gain.gain.setValueAtTime(0.1, context.currentTime + startOffset);
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + startOffset + duration);

        osc.connect(gain);
        gain.connect(context.destination);

        osc.start(context.currentTime + startOffset);
        osc.stop(context.currentTime + startOffset + duration);
    };

    // Play a happy ascending arpeggio (C5 then G5)
    playNote(523.25, 0, 0.15);      // First note
    playNote(783.99, 0.07, 0.2);   // Second note starts slightly after
}

async function playErrorSound() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    
    if (context.state === 'suspended') {
        await context.resume();
    }

    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = 'sine'; // Kept discrete/soft for errors
    osc.frequency.setValueAtTime(196.00, context.currentTime); // Low G3 note
    
    gain.gain.setValueAtTime(0.1, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(context.destination);
    
    osc.start();
    osc.stop(context.currentTime + 0.2);
}

// Global exposure
window.playSuccessSound = playSuccessSound;
window.playErrorSound = playErrorSound;
