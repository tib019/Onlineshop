// 🆕 Funktion zum Anzeigen der Box-Details
function showDetails(boxType) {
    const details = {
        "250kg": {
            text: "250kg Branded Mix: Enthält verschiedene Markenartikel.",
            img: "images/250kg-box.jpg" // Platzhalter für Bild
        },
        "10kg": {
            text: "10kg Mystery Box: Wähle zwischen T-Shirts, Hoodies, Jacken, Hemden usw.",
            img: "images/10kg-box.jpg"
        },
        "1.5kg": {
            text: "1.5kg Mystery Box: Perfekt für kleinere Mengen mit individuellen Kategorien.",
            img: "images/1.5kg-box.jpg"
        },
        "10kg-jacken": "10kg Jacken Box: Enthält eine Vielzahl an Jacken für jedes Wetter und jeden Stil.",
        "10kg-hosen": "10kg Hosen Box: Viele verschiedene Hosen für jedes Outfit und Wetter.",
        "10kg-pullover": "10kg Pullover Box: Wärmende und stylische Pullover für kalte Tage.",
        "10kg-tshirts": "10kg T-Shirts Box: Bunte T-Shirts für jeden Tag.",
        "10kg-sonstiges": "10kg Sonstige Box: Hüte, Gürtel und andere coole Accessoires.",
        "1.5kg-jacken": "1.5kg Jacken Box: Ein Mix an stylischen Jacken in kleineren Mengen.",
        "1.5kg-hosen": "1.5kg Hosen Box: Perfekt für alle, die Hosen in kleinerer Menge suchen.",
        "1.5kg-pullover": "1.5kg Pullover Box: Entspannte Pullover in einer kleinen Box.",
        "1.5kg-tshirts": "1.5kg T-Shirts Box: Ein Mix an T-Shirts für alle Styles.",
        "1.5kg-sonstiges": "1.5kg Sonstige Box: Coole Accessoires und andere Einzelstücke."
    };

    const detailSection = document.getElementById('details');
    const detailText = document.getElementById('details-text');
    const detailImage = document.getElementById('details-image'); // Muss in HTML ergänzt werden

    if (details[boxType]) {
        if (typeof details[boxType] === 'object') {
            detailText.textContent = details[boxType].text;
            detailImage.src = details[boxType].img;
        } else {
            detailText.textContent = details[boxType];
            detailImage.src = ''; // Kein Bild für diese Box
        }
        detailSection.classList.remove('hidden');
    } else {
        detailText.textContent = "Details nicht verfügbar.";
        detailImage.src = "";
        detailSection.classList.remove('hidden');
    }
}

// 🆕 Dynamische Preisänderung basierend auf der Einzelkategorie
function updatePrice(category) {
    const prices = {
        "tshirts": "29€",
        "hoodies": "49€",
        "jacken": "79€",
        "hosen": "59€"
    };

    const priceElement = document.getElementById('category-price');
    if (prices[category]) {
        priceElement.textContent = prices[category];
    } else {
        priceElement.textContent = "Preis auf Anfrage";
    }
}

// 🆕 Smooth Scroll für Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 🆕 Kontaktformular Validierung
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!validateEmail(email)) {
        alert("Bitte gib eine gültige E-Mail-Adresse ein.");
        return;
    }

    if (message.length < 10) {
        alert("Deine Nachricht sollte mindestens 10 Zeichen lang sein.");
        return;
    }

    alert("Danke für deine Nachricht! Wir melden uns bald.");
    this.reset();
});

// 🆕 Helferfunktion zur E-Mail-Validierung
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
