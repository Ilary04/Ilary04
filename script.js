const indicazioneStatus = document.querySelector('.status--gioco');

let giocoInAtto = true; /*sia */
let giocatoreCorrente = "G";
let statusGioco = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

const messaggioVincita = () => `Il giocatore ${giocatoreCorrente} ha vinto!`;
const messaggioPareggio = () => `Gioco in parità!`;
const turnoGiocatoreCorrente = () => `Turno del giocatore ${giocatoreCorrente}`;

indicazioneStatus.innerHTML = turnoGiocatoreCorrente();



const condizioniVincita = [
    //in tutto 54 allineamenti a "4" possibili
    //orizzontali
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [6, 7, 8, 9],
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [13, 14, 15, 16],
    [14, 15, 16, 17],
    [18, 19, 20, 21],
    [19, 20, 21, 22],
    [20, 21, 22, 23],
    [24, 25, 26, 27],
    [25, 26, 27, 28],
    [26, 27, 28, 29],
    [30, 31, 32, 33],
    [31, 32, 33, 34],
    [32, 33, 34, 35],
    
    //verticali
    [0, 6, 12, 18],
    [6, 12, 18, 24],
    [12, 18, 24, 30],
    [1, 7, 13, 19],
    [7, 13, 19, 25],
    [13, 19, 25, 31],
    [2, 8, 14, 20],
    [8, 14, 20, 26],
    [14, 20, 26, 32],
    [3, 9, 15, 21],
    [9, 15, 21, 27],
    [15, 21, 27, 33],
    [4, 10, 16, 22],
    [10, 16, 22, 28],
    [16, 22, 28, 34],
    [5, 11, 17, 23],
    [11, 17, 23, 29],
    [17, 23, 29, 35],
    
    //obliqui, sx-dx
    [2, 9, 16, 23],
    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [14, 21, 28, 35],
    [6, 13, 20, 27],
    [13, 20, 27, 34],
    [12, 19, 26, 33],
    
    //obliqui, dx-sx
    [3, 8, 13, 18],
    [4, 9, 14, 19],
    [9, 14, 19, 24],
    [5, 10, 15, 20],
    [10, 15, 20, 25],
    [15, 20, 25, 30],
    [11, 16, 21, 26],
    [16, 21, 26, 31],
    [17, 22, 27, 32]
];

/* procediCellaGiocata - funzione 1 */
function procediCellaGiocata(cellaCliccata, indiceCellaCliccata) {
    statusGioco[indiceCellaCliccata] = giocatoreCorrente;  // G o R vengono messi nell'array delle celle giocate
    
    if (giocatoreCorrente === "R") {
        document.getElementsByClassName("cella")[indiceCellaCliccata].style.background = "red"; // ++ funzio, rosso in cella[indiceCellaCliccata]!!!
    }
    if (giocatoreCorrente === "G") {
        document.getElementsByClassName("cella")[indiceCellaCliccata].style.background = "yellow"; // ++ funzio, giallo in cella[indiceCellaCliccata]!!!
    }
    
    //cellaCliccata.innerHTML = giocatoreCorrente;  //// disattivando non compaiono più le lettere R e G nei cerchi
    //alert(statusGioco); //// controllo (per debug) array statusGioco con messagebox (disattivato a fine scrittura codice
}

/* procediCambioGiocatore - funzione 2 */
function procediCambioGiocatore() {
    //giocatoreCorrente = giocatoreCorrente === "X" ? "O" : "X";
    giocatoreCorrente = giocatoreCorrente === "G" ? "R" : "G";
    indicazioneStatus.innerHTML = turnoGiocatoreCorrente();
}

/* procediConvalidaRisultato - funzione 3 */
function procediConvalidaRisultato() {
    let giocataVinta = false;
    // ciclo for che passa in rassegna tutti i 54 allineamenti a "4" possibili
    for (let i = 0; i <= 53; i++) {
        const condizVinto = condizioniVincita[i];
        let a = statusGioco[condizVinto[0]];
        let b = statusGioco[condizVinto[1]];
        let c = statusGioco[condizVinto[2]];
        let d = statusGioco[condizVinto[3]]
        if (a === '' || b === '' || c === '' || d === '') {
            continue;
        }
        if (a === b && b === c && c === d) {
            giocataVinta = true;
            break
        }
    }

    if (giocataVinta) {
        indicazioneStatus.innerHTML = messaggioVincita();
        giocoInAtto = false;

        return;
    }

    let giocataPari = !statusGioco.includes("");
    if (giocataPari) {
        indicazioneStatus.innerHTML = messaggioPareggio();
        giocoInAtto = false;
        return;
    }

    procediCambioGiocatore();
}

//======================================================================
/* procediCliccaCella - funzione 4 */
function procediCliccaCella(eventoCellaCliccata) {
    const cellaCliccata = eventoCellaCliccata.target;
    //const indiceCellaCliccata = parseInt(cellaCliccata.getAttribute('data-cell-index'));
    let indiceCellaCliccata = parseInt(cellaCliccata.getAttribute('data-cell-index'));

    // viene imposta l'impossibilità di cliccare in cella che contiene valore char diverso da "" (senza carattere)
    if (statusGioco[indiceCellaCliccata] !== "" || !giocoInAtto) {
        return;
    }
    // viene imposta l'impossibilità di cliccare in una cella sotto la prima fila in alto
    if (indiceCellaCliccata > 5) {
        return;
    }

    // è qui che viene definito/ridefinito l' "indiceCellaCliccata"
    // ricerca in colonna dal basso verso l'alto se cella/e con disco
    // per fare "cadere" il disco messo dal giocatore
    // da 0 a 6 sono i numeri delle celle della prima fila in alto
    for (let j = 0; j < 6; j++) {
        if (indiceCellaCliccata === j) {
            if (statusGioco[indiceCellaCliccata + 30] === "") {
                indiceCellaCliccata = indiceCellaCliccata +30;
            }
            if (statusGioco[indiceCellaCliccata + 24] === "") {
                indiceCellaCliccata = indiceCellaCliccata +24;
            }
            if (statusGioco[indiceCellaCliccata + 18] === "") {
                indiceCellaCliccata = indiceCellaCliccata +18;
            }
            if (statusGioco[indiceCellaCliccata + 12] === "") {
                indiceCellaCliccata = indiceCellaCliccata +12;
            }
            if (statusGioco[indiceCellaCliccata + 6] === "") {
                indiceCellaCliccata = indiceCellaCliccata +6;
            }
        }
    }
    
    procediCellaGiocata(cellaCliccata, indiceCellaCliccata);
    procediConvalidaRisultato();
}
//======================================================================


/* procediRestartGioco - funzione 5 */
function procediRestartGioco() {
    giocoInAtto = true;
    giocatoreCorrente = "G";
    statusGioco = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    indicazioneStatus.innerHTML = turnoGiocatoreCorrente();
    document.querySelectorAll('.cella').forEach(cella => cella.innerHTML = "");
    // reset colore di fondo cerchi celle a blu più chiaro prima fila in alto
    for (let i = 0; i <=5; i++) {
        document.getElementsByClassName("cella")[i].style.background = "CornflowerBlue";
    }
    // reset colore di fondo cerchi celle a blu
    for (let i = 6; i <=53; i++) {
        document.getElementsByClassName("cella")[i].style.background = "blue";
    }

    
}
                  
document.querySelectorAll('.cella').forEach(cella => cella.addEventListener('click', procediCliccaCella));
document.querySelector('.restart--gioco').addEventListener('click', procediRestartGioco);

