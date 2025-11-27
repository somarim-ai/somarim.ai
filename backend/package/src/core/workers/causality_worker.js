process.on('message', (msg) => {
    const { eventToRewrite, newOutcome } = msg;

    // SIMULATING a dangerous, CPU-intensive task
    console.log(`[WORKER] Starting causality rewrite for: ${eventToRewrite}`);
    
    // In a real scenario, this would involve complex physics and temporal mechanics
    const success = Math.random() > 0.2; // 80% chance of success

    if (success) {
        process.send({ 
            status: 'causality_rewritten_successfully',
            event: eventToRewrite,
            new_outcome: newOutcome
        });
    } else {
        process.send({ 
            status: 'error_reality_destabilized',
            event: eventToRewrite,
            error: 'paradox_threshold_exceeded'
        });
    }

    process.exit();
});
