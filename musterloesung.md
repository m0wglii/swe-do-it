## Hinweis:

Bevor du die Musterlösung ansiehst, **empfehlen wir dringend**, zunächst die Übungsaufgabe selbst zu versuchen und bei
Fragen oder Problemen zunächst einen Kollegen oder Mentor um Hilfe zu bitten. Das eigenständige Lösen von Aufgaben
fördert dein Verständnis und deine Fähigkeiten.


<details>
<summary>Musterlösung: Anwendung des DRY-Prinzips</summary>

```js

// ... (vorheriger code)

/**

 * Fügt eine neue Aufgabe der Aufgabenliste hinzu und aktualisiert die Benutzeroberfläche.
 *
 * Diese Funktion wird verwendet, um eine neue Aufgabe zur Aufgabenliste hinzuzufügen. Sie führt mehrere Schritte aus,
 * um sicherzustellen, dass die Aufgabe korrekt erstellt, gespeichert und angezeigt wird. Die Verwendung dieser Funktion
 * fördert das DRY-Prinzip (Don't Repeat Yourself) und reduziert die Code-Wiederholung, da sie von mehreren
 Event-Listenern
 * aufgerufen werden kann.
 *
 * @function
 * @name neueAufgabeHinzufuegen
 * @returns {void}
 *
 * @description
 * Schritte, die von dieser Funktion ausgeführt werden:
 *
 1. Abrufen des Aufgaben-Texts aus dem Eingabefeld abrufen und am Anfang sowie Ende Leerzeichen entfernen.
 2. Prüfen, ob der Aufgaben-Text nicht leer ist.
 3. Erstellen eines neuen Aufgabenobjekts mit dem Text und dem Standardstatus "nicht erledigt".
 4. Hinzufügen des neuen Aufgabenobjekts zum 'aufgaben'-Array.
 5. Speichern der aktualisierten Aufgaben im localStorage.
 6. Leeren des Texteingabefelds für die nächste Eingabe.
 7. Aktualisieren der Anzeige der Aufgabenliste auf der Benutzeroberfläche.
 *
 * Diese Verwendung des DRY-Prinzips reduziert die Code-Wiederholung und macht den Code wartbarer.
 */
function neueAufgabeHinzufuegen() {
    // Schritt 1: Aufgaben-Text aus dem Eingabefeld abrufen und am Anfang sowie Ende Leerzeichen entfernen
    const aufgabenText = aufgabenEingabe.value.trim();
    // Schritt 2: Prüfen, ob der Aufgaben-Text nicht leer ist
    if (aufgabenText !== "") {
        // Schritt 3: Erstelle ein neues Aufgabenobjekt mit dem Text und dem Standardstatus "nicht erledigt"
        const neueAufgabe = {
            text: aufgabenText,
            erledigt: false, // Neue Aufgaben starten als "nicht erledigt"
        };
        // Schritt 4: Füge das neue Aufgabenobjekt dem 'aufgaben'-Array hinzu
        aufgaben.push(neueAufgabe); // Neue Aufgabe zum Array hinzufügen
        // Schritt 5: Speichere die aktualisierten Aufgaben im localStorage
        speichereAufgaben();
        // Schritt 6: Leeren des Texteingabefelds für die nächste Eingabe
        aufgabenEingabe.value = "";
        // Schritt 7: Aktualisieren der Anzeige der Aufgabenliste auf der Benutzeroberfläche
        zeigeAufgaben(); // Aufgabenliste aktualisieren
    }
}

// Event-Listener für das Hinzufügen einer neuen Aufgabe
aufgabeHinzufuegen.addEventListener("click", neueAufgabeHinzufuegen);

// Event-Listener für das Hinzufügen einer neuen Aufgabe beim Drücken der "Enter"-Taste
aufgabenEingabe.addEventListener("keydown", (event) => {
// Überprüfen, ob die gedrückte Taste die Enter-Taste (Keycode 13) ist
    if (event.key === "Enter") {
// Rufe die Funktion 'neueAufgabeHinzufuegen' auf, um die Aufgabe hinzuzufügen
        neueAufgabeHinzufuegen();
    }
});

```

</details>
