
// 1809 - DNEVNE LJUBAVNE PORUKE ❤️

// 100 jutarnjih i 100 noćnih poruka.
// Ista poruka se prikazuje oboma tokom istog dana.

const jutroPocetak = [
"Dobro jutro, ljubavi.",
"Dobro jutro, najlepša moja.",
"Hej, sunce moje,",
"Jedan nežan pozdrav za tebe:",
"Šaljem ti jutarnji poljubac,",
"Dobro jutro, moje srce.",
"Za početak dana, samo da znaš:",
"Probudi se polako, lepoto.",
"Moja prva misao danas je:",
"Jedno posebno jutro za tebe:"
];

const jutroKraj = [
"želim ti dan pun osmeha. ❤️",
"nadam se da će ti sve danas ići od ruke. 🌸",
"ne zaboravi koliko si posebna. 💗",
"šaljem ti najtopliji zagrljaj. 🫂",
"neka ti danas sve bude nežno i lepo. ☀️",
"čuvaj svoj osmeh, mnogo mi znači. 😊",
"mislim na tebe i navijam za tebe. ❤️",
"zaslužuješ samo lepe trenutke. ✨",
"voleo bih da mogu sada da te zagrlim. 💋",
"neka ti srce danas bude mirno i srećno. 🤍"
];

const nocPocetak = [
"Laku noć, ljubavi.",
"Spavaj lepo, najdraža moja.",
"Pre nego što zaspiš, znaj:",
"Šaljem ti poljubac za kraj dana,",
"Ušuškaj se, moje srce,",
"Večeras samo želim da ti kažem:",
"Neka te ova poruka nežno zagrli:",
"Laku noć, moje sunce.",
"Zatvori oči i odmori,",
"Još jedna nežna misao za tebe:"
];

const nocKraj = [
"želim ti najlepše snove. 🌙",
"neka ti noć donese mir. 🤍",
"voleo bih da sam sada kraj tebe. ❤️",
"šaljem ti zagrljaj do jutra. 🫂",
"sutra te čeka novi razlog za osmeh. ✨",
"odmori, zaslužuješ svu nežnost sveta. 💗",
"neka te zvezde čuvaju. ⭐",
"ti si moja poslednja misao danas. 💋",
"sanjaj nešto lepo i probudi se srećna. 🌸",
"volim što postojiš. ❤️"
];

// Formiramo 100 različitih kombinacija za svaku kovertu.
const jutarnjePoruke = jutroPocetak.flatMap(pocetak =>
    jutroKraj.map(kraj => pocetak + " " + kraj)
);

const nocnePoruke = nocPocetak.flatMap(pocetak =>
    nocKraj.map(kraj => pocetak + " " + kraj)
);

// Elementi na stranici.
const morningEnvelope = document.getElementById("morningEnvelope");
const nightEnvelope = document.getElementById("nightEnvelope");

const morningStatus = document.getElementById("morningStatus");
const nightStatus = document.getElementById("nightStatus");

const dailyModal = document.getElementById("dailyMessageModal");
const dailyTitle = document.getElementById("dailyMessageTitle");
const dailyText = document.getElementById("dailyMessageText");
const closeDailyMessage = document.getElementById("closeDailyMessage");

// Broj dana od početka računanja.
function dayNumber(date) {
    const midnight = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    return Math.floor(midnight.getTime() / 86400000);
}

// Izbor poruke koja važi za današnji datum.
function todaysMessage(list) {
    const index = ((dayNumber(new Date()) % list.length) + list.length) % list.length;
    return list[index];
}

// Provera vremena i zaključavanje koverti.
function updateEnvelopeLocks() {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();

    // Dobro jutro: 06:00 do 22:39.
    const morningOpen = minutes >= 360 && minutes < 1360;

    // Laku noć: 22:40 do 23:59.
    const nightOpen = minutes >= 1360;

    morningEnvelope.disabled = !morningOpen;
    nightEnvelope.disabled = !nightOpen;

    morningEnvelope.classList.toggle("is-locked", !morningOpen);
    nightEnvelope.classList.toggle("is-locked", !nightOpen);

    morningStatus.textContent = morningOpen
        ? "Otvorena je do 22:40"
        : (minutes < 360 ? "Otvara se u 06:00" : "Ponovo sutra u 06:00");

    nightStatus.textContent = nightOpen
        ? "Otvorena je do 00:00"
        : "Otvara se u 22:40";
}

// Prikaz poruke.
function showDailyMessage(kind) {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();

    if (kind === "morning" && !(minutes >= 360 && minutes < 1360)) return;
    if (kind === "night" && minutes < 1360) return;

    dailyTitle.textContent = kind === "morning"
        ? "Dobro jutro, ljubavi ❤️"
        : "Laku noć, ljubavi 🌙";

    dailyText.textContent = todaysMessage(
        kind === "morning" ? jutarnjePoruke : nocnePoruke
    );

    dailyModal.classList.remove("hidden");
    dailyModal.setAttribute("aria-hidden", "false");
}

// Klik na koverte.
morningEnvelope.addEventListener("click", () => {
    showDailyMessage("morning");
});

nightEnvelope.addEventListener("click", () => {
    showDailyMessage("night");
});

// Zatvaranje poruke.
function closeMessage() {
    dailyModal.classList.add("hidden");
    dailyModal.setAttribute("aria-hidden", "true");
}

closeDailyMessage.addEventListener("click", closeMessage);

dailyModal.addEventListener("click", event => {
    if (event.target === dailyModal) {
        closeMessage();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMessage();
    }
});

// Provera vremena na svakih 15 sekundi.
updateEnvelopeLocks();
setInterval(updateEnvelopeLocks, 15000);
