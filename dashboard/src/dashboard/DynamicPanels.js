/**
 * DynamicPanels.js
 * 
 * This module is responsible for animating and updating the content of the 
 * expanding control panels in real-time to simulate live data feeds and processes.
 */

const GeminiAIController = {
    speakResponse: (message) => {
        console.log("Gemini: ", message);
        const vitals = document.getElementById('vitals');
        if (vitals) {
            vitals.innerText = message;
        }
    }
};

let neuralRepairInterval = null;
let quantumHealingInterval = null;
let strokeReversalInterval = null;
let geneticOptimizationInterval = null;

export const PanelUpdater = {

    /**
     * Starts the real-time simulation for the Neural Repair panel.
     */
    startNeuralRepairSimulation: () => {
        if (neuralRepairInterval) clearInterval(neuralRepairInterval);

        const progressBar = document.querySelector('#neural-repair-panel .treatment-progress progress');
        const progressText = document.querySelector('#neural-repair-panel .treatment-progress h4');
        const regenRate = document.querySelector('#neural-repair-panel .vital-monitors p:nth-child(2)');

        let progress = 0;
        progressBar.value = progress;

        GeminiAIController.speakResponse("NRH-9000 simulation initiated. Monitoring neural regeneration.");

        neuralRepairInterval = setInterval(() => {
            progress += Math.random() * 5;
            if (progress >= 100) {
                progress = 100;
                GeminiAIController.speakResponse("Neural repair complete. Patient vitals are stable.");
                clearInterval(neuralRepairInterval);
            }
            
            progressBar.value = progress;
            progressText.innerText = `Treatment Progress: ${Math.round(progress)}%`;
            
            const rate = (Math.random() * 0.5 + 1.2).toFixed(1);
            regenRate.innerText = `Cellular Regeneration: ${rate}M/sec`;

        }, 1000);
    },

    /**
     * Starts the real-time simulation for the Quantum Healing panel.
     */
    startQuantumHealingSimulation: () => {
        if (quantumHealingInterval) clearInterval(quantumHealingInterval);

        const energyFlow = document.querySelector('#quantum-healing-panel .energy-flow-value');
        const dnaStability = document.querySelector('#quantum-healing-panel .dna-stability-value');

        GeminiAIController.speakResponse("QHB-100 simulation initiated. Cellular energy flow is being optimized.");

        quantumHealingInterval = setInterval(() => {
            const flow = (Math.random() * 15 + 85).toFixed(1);
            const stability = (99.9 - Math.random() * 0.1).toFixed(2);

            energyFlow.innerText = `${flow} TW`;
            dnaStability.innerText = `${stability}%`;

        }, 1500);

        document.getElementById('stabilize-btn').addEventListener('click', () => {
             GeminiAIController.speakResponse("DNA stabilization field engaged. Increasing coherence.");
        });
    },

    /**
     * Starts the real-time simulation for the Stroke Reversal panel.
     */
    startStrokeReversalSimulation: () => {
        if (strokeReversalInterval) clearInterval(strokeReversalInterval);

        const progressText = document.querySelector('#stroke-reversal-panel .reversal-progress');
        const pathwaysRestored = document.querySelector('#stroke-reversal-panel .pathways-restored');
        let progress = 0;
        let pathways = 0;

        GeminiAIController.speakResponse("Stroke reversal matrix activated. Restoring neural pathways.");

        strokeReversalInterval = setInterval(() => {
            progress += Math.random() * 3;
            pathways += Math.floor(Math.random() * 100);
            if (progress >= 100) {
                progress = 100;
                GeminiAIController.speakResponse("Stroke reversal complete. Full neural function restored.");
                clearInterval(strokeReversalInterval);
            }

            progressText.innerText = `Progress: ${Math.round(progress)}%`;
            pathwaysRestored.innerText = `Pathways Restored: ${pathways}`;

        }, 1200);
    },

    /**
     * Starts the real-time simulation for the Genetic Optimization panel.
     */
    startGeneticOptimizationSimulation: () => {
        if (geneticOptimizationInterval) clearInterval(geneticOptimizationInterval);

        const cognitiveScore = document.querySelector('#genetic-optimization-panel .cognitive-score');
        const brainwaveFreq = document.querySelector('#genetic-optimization-panel .brainwave-frequency');

        let score = 80;
        let frequency = 12;

        GeminiAIController.speakResponse("Genetic optimization initiated. Enhancing cognitive function.");

        geneticOptimizationInterval = setInterval(() => {
            score += Math.random() * 0.5;
            frequency += Math.random() * 0.2 - 0.1;
            if (score >= 100) {
                score = 100;
                GeminiAIController.speakResponse("Cognitive enhancement complete. Peak performance achieved.");
                clearInterval(geneticOptimizationInterval);
            }

            cognitiveScore.innerText = `Cognitive Score: ${Math.round(score)}`;
            brainwaveFreq.innerText = `Brainwave Frequency: ${frequency.toFixed(2)} Hz`;

        }, 800);
    },

    /**
     * Stops any active simulations.
     */
    stopAllSimulations: () => {
        if (neuralRepairInterval) clearInterval(neuralRepairInterval);
        if (quantumHealingInterval) clearInterval(quantumHealingInterval);
        if (strokeReversalInterval) clearInterval(strokeReversalInterval);
        if (geneticOptimizationInterval) clearInterval(geneticOptimizationInterval);
        GeminiAIController.speakResponse("All simulations have been terminated.");
    }
};
