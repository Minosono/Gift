// Warten, bis das gesamte HTML geladen ist
document.addEventListener('DOMContentLoaded', () => {

    // Den Button holen
    const celebrateButton = document.getElementById('celebrate-button');

    // Prüfen, ob der Button existiert (gute Praxis)
    if (celebrateButton) {
        // Event Listener hinzufügen: Wenn der Button geklickt wird...
        celebrateButton.addEventListener('click', () => {
            console.log('Feiern Button geklickt!'); // Zur Kontrolle in der Entwicklerkonsole

            // Konfetti auslösen!
            // Diese Optionen sorgen für einen schönen, breiten Effekt
            confetti({
                particleCount: 150, // Mehr Partikel
                spread: 100,        // Breitere Streuung
                origin: { y: 0.6 }  // Startet etwas unterhalb der Mitte
            });

            // Kleiner visueller Bonus: Button kurz 'wackeln' lassen
             celebrateButton.style.transform = 'scale(1.1)';
             setTimeout(() => {
                 celebrateButton.style.transform = 'scale(1)';
             }, 200); // Nach 200ms zurücksetzen
        });
    } else {
        console.error("Button mit der ID 'celebrate-button' nicht gefunden.");
    }
});
