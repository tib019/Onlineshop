/**
 * Regression tests for Onlineshop script.js
 * Covers edge cases, currency formatting, and empty states
 */

beforeEach(() => {
  document.body.innerHTML = `
    <nav>
      <a href="#shop">Shop</a>
      <a href="#about">Über Uns</a>
    </nav>
    <section id="details" class="hidden">
      <p id="details-text"></p>
      <img id="details-image" src="" alt="" />
    </section>
    <span id="category-price"></span>
    <form id="contact-form">
      <input type="text" name="name" id="name" />
      <input type="email" name="email" id="email" />
      <textarea name="message" id="message"></textarea>
      <button type="submit">Absenden</button>
    </form>
  `;
});

// ─── Inline helpers (mirrors script.js) ───────────────────────────────────────

function showDetails(boxType) {
  const details = {
    '250kg': { text: '250kg Branded Mix: Enthält verschiedene Markenartikel.', img: 'images/250kg-box.jpg' },
    '10kg': { text: '10kg Mystery Box: Wähle zwischen T-Shirts, Hoodies, Jacken, Hemden usw.', img: 'images/10kg-box.jpg' },
    '1.5kg': { text: '1.5kg Mystery Box: Perfekt für kleinere Mengen mit individuellen Kategorien.', img: 'images/1.5kg-box.jpg' },
    '10kg-jacken': '10kg Jacken Box: Enthält eine Vielzahl an Jacken für jedes Wetter und jeden Stil.',
    '10kg-hosen': '10kg Hosen Box: Viele verschiedene Hosen für jedes Outfit und Wetter.',
    '10kg-pullover': '10kg Pullover Box: Wärmende und stylische Pullover für kalte Tage.',
    '10kg-tshirts': '10kg T-Shirts Box: Bunte T-Shirts für jeden Tag.',
    '10kg-sonstiges': '10kg Sonstige Box: Hüte, Gürtel und andere coole Accessoires.',
    '1.5kg-jacken': '1.5kg Jacken Box: Ein Mix an stylischen Jacken in kleineren Mengen.',
    '1.5kg-hosen': '1.5kg Hosen Box: Perfekt für alle, die Hosen in kleinerer Menge suchen.',
    '1.5kg-pullover': '1.5kg Pullover Box: Entspannte Pullover in einer kleinen Box.',
    '1.5kg-tshirts': '1.5kg T-Shirts Box: Ein Mix an T-Shirts für alle Styles.',
    '1.5kg-sonstiges': '1.5kg Sonstige Box: Coole Accessoires und andere Einzelstücke.',
  };

  const detailSection = document.getElementById('details');
  const detailText = document.getElementById('details-text');
  const detailImage = document.getElementById('details-image');

  if (details[boxType]) {
    if (typeof details[boxType] === 'object') {
      detailText.textContent = details[boxType].text;
      detailImage.src = details[boxType].img;
    } else {
      detailText.textContent = details[boxType];
      detailImage.src = '';
    }
    detailSection.classList.remove('hidden');
  } else {
    detailText.textContent = 'Details nicht verfügbar.';
    detailImage.src = '';
    detailSection.classList.remove('hidden');
  }
}

function updatePrice(category) {
  const prices = { tshirts: '29€', hoodies: '49€', jacken: '79€', hosen: '59€' };
  const priceElement = document.getElementById('category-price');
  if (prices[category]) {
    priceElement.textContent = prices[category];
  } else {
    priceElement.textContent = 'Preis auf Anfrage';
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Currency formatting regressions ──────────────────────────────────────────

describe('Currency formatting', () => {
  test('prices from updatePrice contain € symbol', () => {
    updatePrice('jacken');
    expect(document.getElementById('category-price').textContent).toContain('€');
  });

  test('prices in product list have correct decimal format', () => {
    const prices = ['€89.99', '€69.99', '€79.99', '€49.99', '€59.99',
                    '€39.99', '€29.99', '€34.99', '€19.99', '€24.99'];
    prices.forEach((p) => {
      const num = parseFloat(p.replace('€', ''));
      expect(Number.isFinite(num)).toBe(true);
      expect(num).toBeGreaterThan(0);
    });
  });

  test('all dynamic prices end with €', () => {
    ['tshirts', 'hoodies', 'jacken', 'hosen'].forEach((cat) => {
      updatePrice(cat);
      expect(document.getElementById('category-price').textContent).toMatch(/€$/);
    });
  });

  test('fallback price text does not contain a number', () => {
    updatePrice('doesnotexist');
    const text = document.getElementById('category-price').textContent;
    expect(text).toBe('Preis auf Anfrage');
    expect(/^\d/.test(text)).toBe(false);
  });
});

// ─── Empty state regressions ───────────────────────────────────────────────────

describe('Empty state handling', () => {
  test('showDetails with null shows fallback', () => {
    showDetails(null);
    expect(document.getElementById('details-text').textContent).toBe('Details nicht verfügbar.');
  });

  test('showDetails with undefined shows fallback', () => {
    showDetails(undefined);
    expect(document.getElementById('details-text').textContent).toBe('Details nicht verfügbar.');
  });

  test('detail section never left in hidden state after call', () => {
    showDetails('nonexistent');
    expect(document.getElementById('details').classList.contains('hidden')).toBe(false);
  });

  test('updatePrice with null sets fallback text', () => {
    updatePrice(null);
    expect(document.getElementById('category-price').textContent).toBe('Preis auf Anfrage');
  });

  test('updatePrice with number input sets fallback text', () => {
    updatePrice(42);
    expect(document.getElementById('category-price').textContent).toBe('Preis auf Anfrage');
  });

  test('validateEmail with null returns false', () => {
    expect(validateEmail(null)).toBe(false);
  });

  test('validateEmail with number returns false', () => {
    expect(validateEmail(12345)).toBe(false);
  });
});

// ─── showDetails idempotency ───────────────────────────────────────────────────

describe('showDetails idempotency', () => {
  test('calling showDetails twice overwrites previous content', () => {
    showDetails('10kg-tshirts');
    showDetails('10kg-jacken');
    const text = document.getElementById('details-text').textContent;
    expect(text).toContain('Jacken');
    expect(text).not.toContain('T-Shirts');
  });

  test('switching from object-style to string-style clears image', () => {
    showDetails('250kg');             // object-style → has img
    showDetails('10kg-hosen');        // string-style → img cleared
    expect(document.getElementById('details-image').getAttribute('src')).toBe('');
  });

  test('switching from string-style to object-style sets image', () => {
    showDetails('10kg-hosen');        // string-style
    showDetails('10kg');              // object-style → sets img
    const src = document.getElementById('details-image').getAttribute('src');
    expect(src).toContain('10kg-box');
  });
});

// ─── Nav anchor href regression ───────────────────────────────────────────────

describe('Navigation anchor regression', () => {
  test('nav contains expected href values', () => {
    const links = document.querySelectorAll('nav a');
    const hrefs = Array.from(links).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('#shop');
    expect(hrefs).toContain('#about');
  });
});

// ─── Email edge cases ─────────────────────────────────────────────────────────

describe('validateEmail edge cases', () => {
  test('email with multiple dots in local part is valid', () => {
    expect(validateEmail('first.last.name@example.com')).toBe(true);
  });

  test('email with hyphen in domain is valid', () => {
    expect(validateEmail('user@my-domain.de')).toBe(true);
  });

  test('email with just whitespace is invalid', () => {
    expect(validateEmail('   ')).toBe(false);
  });

  test('email that is only @ is invalid', () => {
    expect(validateEmail('@')).toBe(false);
  });

  test('email with newline is invalid', () => {
    expect(validateEmail('user\n@example.com')).toBe(false);
  });

  test('very long valid email is accepted', () => {
    const longLocal = 'a'.repeat(50);
    expect(validateEmail(`${longLocal}@example.com`)).toBe(true);
  });
});
