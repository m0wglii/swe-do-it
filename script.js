// Die folgenden drei Konstanten dienen dazu, auf wichtige HTML-Elemente in unserer Liste zuzugreifen:

// 'aufgabenEingabe' repräsentiert das HTML-Texteingabefeld, in dem Benutzer neue Aufgaben hinzufügen können.
const aufgabenEingabe = document.getElementById("aufgabenEingabe");

// 'aufgabeHinzufuegen' ist eine Referenz auf den "Hinzufügen"-Button in der Benutzeroberfläche.
// Dieser Button wird verwendet, um die Aktion des Hinzufügens einer neuen Aufgabe auszulösen, wenn Benutzer darauf klicken.
const aufgabeHinzufuegen = document.getElementById("aufgabeHinzufuegen");

// 'aufgabenListe' ist ein Verweis auf die HTML-Liste, in der die Aufgaben angezeigt werden.
// Sie dient dazu, Aufgaben anzuzeigen, zu aktualisieren und zu löschen, um die Benutzerinteraktion in unserer Liste zu ermöglichen.
const aufgabenListe = document.getElementById("aufgabenListe");

// Laden von Aufgaben aus dem localStorage beim Seitenstart
// JSON.parse(localStorage.getItem("aufgaben")) versucht, die im localStorage gespeicherten Aufgaben zu laden.
// Der localStorage speichert Daten als Zeichenkette (String).
// Bevor wir die Aufgaben verwenden können, müssen wir die Zeichenkette in ein JavaScript-Objekt umwandeln.
// Wenn keine Aufgaben gefunden werden (z. B. beim ersten Seitenbesuch), wird ein leeres Array `[]` verwendet.
const aufgaben = JSON.parse(localStorage.getItem("aufgaben")) || [];

/**
 * Speichert die aktuellen Aufgaben im localStorage.
 *
 * @function
 * @name speichereAufgaben
 * @returns {void}
 * @description Diese Funktion verwendet 'localStorage.setItem', um die aktuellen Aufgaben im localStorage zu speichern.
 * Bevor die Aufgaben gespeichert werden, werden sie mit 'JSON.stringify' in eine Zeichenkette umgewandelt, da der localStorage
 * nur Zeichenketten speichern kann. Diese Zeichenkette kann später mit 'JSON.parse' zurück in ein JavaScript-Objekt umgewandelt
 * werden, wenn die Aufgaben wieder geladen werden müssen.
 */
function speichereAufgaben() {
    localStorage.setItem("aufgaben", JSON.stringify(aufgaben));
}

/**
 * Aktualisiert die Anzeige der Aufgabenliste auf der Benutzeroberfläche.
 *
 * @function
 * @name zeigeAufgaben
 * @returns {void}
 * @description Diese Funktion löscht zuerst den bestehenden Inhalt der Aufgabenliste auf der Benutzeroberfläche
 * und erstellt dann für jede Aufgabe ein neues Listenelement für jede Aufgabe.
 * Sie fügt auch Event-Listener hinzu, um auf Benutzeraktionen zu reagieren, z. B. das Löschen einer Aufgabe
 * oder das Ändern ihres Status.
 * Nachdem die Liste aktualisiert wurde, ruft sie 'speichereAufgaben' auf, um die Änderungen im localStorage zu speichern,
 * und aktualisiert erneut die Anzeige der Aufgabenliste.
 */
function zeigeAufgaben() {
    // Die Zeile löscht den bestehenden Inhalt der Aufgabenliste auf der Benutzeroberfläche,
    // indem sie den Inhalt des Elements auf einen leeren String setzt.
    aufgabenListe.innerHTML = "";

    // Iteriere durch jede Aufgabe im 'aufgaben'-Array und erstelle ein neues Listenelement für jede Aufgabe.
    aufgaben.forEach((aufgabe, index) => {
        const listenElement = document.createElement("li");

        // Erstelle das HTML-Template für jedes Listenelement.
        // Das Template enthält den Radio-Button zum Ändern des Status, den Aufgabentext und den Button zum Löschen.
        // Das Aufgabentext-Element erhält ein zusätzliches 'text-decoration' CSS-Stilattribut, um den Text durchzustreichen,
        // wenn die Aufgabe als "erledigt" markiert ist.
        const durchgestrichen = aufgabe.erledigt
            ? "text-decoration: line-through;"
            : "";
        listenElement.innerHTML = `
            <input type="radio" class="status" ${
            aufgabe.erledigt ? "checked" : ""
        }>
            <span style="${durchgestrichen}">${aufgabe.text}</span>
            <button class="loeschen">Löschen</button>
        `;

        // Füge das erstellte Listenelement zur Aufgabenliste hinzu.
        aufgabenListe.appendChild(listenElement);

        // 'querySelector' ist eine Methode, die verwendet wird, um ein HTML-Element innerhalb eines anderen Elements zu finden.
        // In diesem Fall suchen wir nach einem Element mit der Klasse "loeschen" innerhalb des 'listenElement'.
        // Das Element mit der Klasse "loeschen" ist der "Löschen"-Button, der zu jeder Aufgabe gehört.
        listenElement.querySelector(".loeschen").addEventListener("click", () => {
            // Wenn ein Benutzer auf den "Löschen"-Button klickt, wird die angegebene Funktion (der Event-Handler) ausgeführt.
            // Hier wird die Funktion als Pfeilfunktion () => { ... } definiert.
            // Im Inneren dieser Funktion werden drei Schritte ausgeführt:
            //
            // 1. Die Aufgabe wird aus dem 'aufgaben'-Array entfernt. 'index' ist der Index der aktuellen Aufgabe in der Liste.
            //    'splice' ist eine Methode, die verwendet wird, um Elemente aus einem Array zu entfernen. In diesem Fall wird
            //    die Aufgabe an der Position 'index' (aus der umschließenden .forEach-Schleife) entfernt.
            aufgaben.splice(index, 1);
            // 2. 'speichereAufgaben()' wird aufgerufen, um die Änderungen im localStorage zu speichern.
            //    Dies stellt sicher, dass die Aufgabenliste nach dem Löschen aktualisiert und gespeichert wird.
            speichereAufgaben();
            // 3. 'zeigeAufgaben()' wird erneut aufgerufen, um die Anzeige der Aufgabenliste auf der Benutzeroberfläche zu aktualisieren.
            //    Dadurch wird die gelöschte Aufgabe aus der Benutzeroberfläche entfernt.
            zeigeAufgaben();
            // Zusammengefasst: Wenn ein Benutzer auf den "Löschen"-Button klickt, wird die zugehörige Aufgabe gelöscht, im localStorage
            // gespeichert und die Anzeige der Aufgabenliste aktualisiert.
        });

        // Dieser Event-Listener wird aufgerufen, wenn ein Benutzer auf den Radio-Button einer Aufgabe klickt.
        // In dieser Funktion wird der Status der Aufgabe umgekehrt (von erledigt auf nicht erledigt und umgekehrt),
        // und der Aufgabentext wird durchgestrichen oder nicht durchgestrichen, abhängig vom Status.
        const statusRadio = listenElement.querySelector(".status");
        statusRadio.addEventListener("click", () => {
            // Der Status der Aufgabe wird umgekehrt. Wenn die Aufgabe zuvor als "erledigt" markiert war, wird sie nun als "nicht erledigt" markiert
            // (und umgekehrt). Dies wird erreicht, indem 'aufgabe.erledigt' negiert wird. Das bedeutet, wenn 'aufgabe.erledigt' zuvor true
            // war (Aufgabe als erledigt markiert), wird es jetzt zu false gesetzt (Aufgabe nicht erledigt) und umgekehrt. Diese Umkehrung
            // ermöglicht es Benutzern, den Status einer Aufgabe einfach durch Klicken auf den Radio-Button zu ändern.
            aufgabe.erledigt = !aufgabe.erledigt;

            // Aktualisiere den Stil des Aufgabentexts, um ihn durchzustreichen oder nicht durchzustreichen, abhängig vom Status.
            const textElement = listenElement.querySelector("span");
            textElement.style.textDecoration = aufgabe.erledigt
                ? "line-through"
                : "none";

            // Überprüfe, ob der Radio-Button ausgewählt ist, und setze ihn zurück, wenn die Aufgabe als "nicht erledigt" markiert wird.
            if (!aufgabe.erledigt) {
                statusRadio.checked = false;
            }

            // 'speichereAufgaben()' wird aufgerufen, um die Änderungen im localStorage zu speichern.
            speichereAufgaben();
        });
    });
}

// Event-Listener für das Hinzufügen einer neuen Aufgabe
aufgabeHinzufuegen.addEventListener("click", () => {
    // Schritt 1: Aufgaben-Text aus dem Eingabefeld abrufen und am Anfang sowie Ende Leerzeichen entfernen
    const aufgabenText = aufgabenEingabe.value.trim();
    // Schritt 2: Prüfen, ob der aufgabenText nicht leer ist
    if (aufgabenText !== "") {
        // Schritt 3: Erstelle ein neues Aufgabenobjekt mit dem Text und dem Standardstatus nicht erledigt
        const neueAufgabe = {
            text: aufgabenText,
            erledigt: false, // Neue Aufgaben starten als "nicht-erledigt"
        };
        // Schritt 4: Füge das neue Aufgabenobjekt dem 'aufgaben'-Array hinzu
        aufgaben.push(neueAufgabe); // Neue Aufgabe zum Array hinzufügen
        // Schritt 5: Speichere die aktualisierten Aufgaben im localStorage
        speichereAufgaben();
        // Schritt 6: Leere das Texteingabefeld für die nächste Eingabe
        aufgabenEingabe.value = "";
        // Schritt 7: Aktualisiere die Anzeige der Aufgabenliste auf der Benutzeroberfläche
        zeigeAufgaben(); // Aufgabenliste aktualisieren
    }
});

// Event-Listener für das Hinzufügen einer neuen Aufgabe beim Drücken der "Enter"-Taste
aufgabenEingabe.addEventListener("keydown", (event) => {
    // Überprüfen, ob die gedrückte Taste die Enter-Taste (Keycode 13) ist
    if (event.key === "Enter") {
        // Schritt 1: Aufgaben-Text aus dem Eingabefeld abrufen und am Anfang sowie Ende Leerzeichen entfernen
        const aufgabenText = aufgabenEingabe.value.trim();
        // Schritt 2: Prüfen, ob der aufgabenText nicht leer ist
        if (aufgabenText !== "") {
            // Schritt 3: Erstelle ein neues Aufgabenobjekt mit dem Text und dem Standardstatus nicht erledigt
            const neueAufgabe = {
                text: aufgabenText,
                erledigt: false, // Neue Aufgaben starten als "nicht-erledigt"
            };
            // Schritt 4: Füge das neue Aufgabenobjekt dem 'aufgaben'-Array hinzu
            aufgaben.push(neueAufgabe);
            // Schritt 5: Speichere die aktualisierten Aufgaben im localStorage
            speichereAufgaben();
            // Schritt 6: Leere das Texteingabefeld für die nächste Eingabe
            aufgabenEingabe.value = "";
            // Schritt 7: Aktualisiere die Anzeige der Aufgabenliste auf der Benutzeroberfläche
            zeigeAufgaben(); // Aufgabenliste aktualisieren
        }
    }
});

// Die Aufgabenliste bei Seitenstart anzeigen
zeigeAufgaben();
