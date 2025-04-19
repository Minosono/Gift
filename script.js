document.addEventListener('DOMContentLoaded', () => {

    // Elemente holen
    const revealButton = document.getElementById('reveal-gift-button');
    const giftWrapper = document.getElementById('gift-wrapper');
    const giftContent = document.getElementById('gift-content');
    const reminderButton = document.getElementById('reminder-button');
    const downloadLink = document.getElementById('download-link'); // Für ICS

    // 1. Konfetti sofort beim Laden starten
    confetti({
        particleCount: 180, // Mehr Partikel
        spread: 120,         // Breitere Streuung
        origin: { y: 0.6 }, // Startpunkt
        zIndex: 1000         // Sicherstellen, dass es über anderen Elementen liegt
    });

    // Einfacher "Ping"-Sound (Web Audio API)
    let audioContext;
    function playSound() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            if (!audioContext) {
                console.warn("Web Audio API nicht unterstützt.");
                return; // Sound kann nicht abgespielt werden
            }
        }
        // Einfachen Oszillator (Sinuswelle) erstellen
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain(); // Lautstärkeregler

        oscillator.type = 'sine'; // Typ des Tons (sine, square, sawtooth, triangle)
        oscillator.frequency.setValueAtTime(660, audioContext.currentTime); // Frequenz (Tonhöhe)
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Startlautstärke
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5); // Schnell leiser werden

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination); // Mit den Lautsprechern verbinden

        oscillator.start(audioContext.currentTime); // Sound starten
        oscillator.stop(audioContext.currentTime + 0.5); // Nach 0.5 Sekunden stoppen
    }


    // 2. Geschenk enthüllen beim Klick
    if (revealButton && giftWrapper && giftContent) {
        revealButton.addEventListener('click', () => {
            console.log('Enthülle Geschenk...');
            playSound(); // Sound abspielen

            // Button ausblenden (mit leichter Verzögerung, damit der Sound passt)
            giftWrapper.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            giftWrapper.style.opacity = '0';
            giftWrapper.style.transform = 'scale(0.8)';


            // Nach kurzer Zeit Wrapper entfernen und Inhalt einblenden
            setTimeout(() => {
                giftWrapper.style.display = 'none'; // Wrapper komplett entfernen

                // Inhalt sichtbar machen
                giftContent.classList.remove('hidden');
                // Trigger reflow, damit die Transition startet
                void giftContent.offsetWidth;
                giftContent.classList.add('visible');

                console.log('Geschenk enthüllt!');
            }, 300); // 300ms Verzögerung

        });
    } else {
        console.error("Button oder Geschenk-Container nicht gefunden.");
    }

    // 3. Erinnerung (.ics Datei) generieren und herunterladen
    if (reminderButton && downloadLink) {
         reminderButton.addEventListener('click', () => {
            console.log('Erinnerung generieren...');
            const eventTitle = "Mama Legami Stifte aussuchen";
            const eventDescription = "Denk daran, Mama Bescheid zu sagen, welche 3 Legami Stifte sie sich ausgesucht hat! Link zur Auswahl: https://www.legami.com/de_de/papierwaren/schreibwaren/loschbare-stifte.html";

            // Einfaches ICS-Format
            const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyGiftWebsite//NONSGML v1.0//DE
BEGIN:VEVENT
UID:${new Date().toISOString()}@mygiftwebsite.local # Eindeutige ID
DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, '')}Z
DTSTART;VALUE=DATE:${new Date().toISOString().slice(0,10).replace(/-/g, '')} # Heute als Startdatum (nur Datum)
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription.replace(/\n/g, '\\n')} # Zeilenumbrüche escapen
END:VEVENT
END:VCALENDAR`;

            // Download auslösen
            downloadLink.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent);
            downloadLink.download = 'Erinnerung_Legami_Stifte.ics'; // Dateiname
            downloadLink.click(); // Simuliert Klick auf den Download-Link
            console.log('.ics Datei zum Download bereitgestellt.');
        });
    } else {
        console.error("Erinnerungs-Button oder Download-Link nicht gefunden.");
    }

});
