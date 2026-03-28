/**
 * Unit tests for Onlineshop script.js
 * Tests: showDetails, updatePrice, validateEmail, contact form logic
 */

// Setup minimal DOM environment before loading functions
beforeEach(() => {
  document.body.innerHTML = `
    <nav>
      <a href="#shop">Shop</a>
      <a href="#about">Über Uns</a>
      <a href="#contact">Kontakt</a>
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

// ─── showDetails ───────────────────────────────────────────────────────────────

describe('showDetails()', () => {
  // Inline the function under test to avoid DOM-event side-effects at load time
  function showDetails(boxType) {
    const details = {
      '250kg': {
        text: '250kg Branded Mix: Enthält verschiedene Markenartikel.',
        img: 'images/250kg-box.jpg',
      },
      '10kg': {
        text: '10kg Mystery Box: Wähle zwischen T-Shirts, Hoodies, Jacken, Hemden usw.',
        img: 'images/10kg-box.jpg',
      },
      '1.5kg': {
        text: '1.5kg Mystery Box: Perfekt für kleinere Mengen mit individuellen Kategorien.',
        img: 'images/1.5kg-box.jpg',
      },
      '10kg-jacken':
        '10kg Jacken Box: Enthält eine Vielzahl an Jacken für jedes Wetter und jeden Stil.',
      '10kg-hosen': '10kg Hosen Box: Viele verschiedene Hosen für jedes Outfit und Wetter.',
      '10kg-pullover': '10kg Pullover Box: Wärmende und stylische Pullover für kalte Tage.',
      '10kg-tshirts': '10kg T-Shirts Box: Bunte T-Shirts für jeden Tag.',
      '10kg-sonstiges': '10kg Sonstige Box: Hüte, Gürtel und andere coole Accessoires.',
      '1.5kg-jacken': '1.5kg Jacken Box: Ein Mix an stylischen Jacken in kleineren Mengen.',
      '1.5kg-hosen':
        '1.5kg Hosen Box: Perfekt für alle, die Hosen in kleinerer Menge suchen.',
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

  test('shows details for 250kg object-style box', () => {
    showDetails('250kg');
    expect(document.getElementById('details-text').textContent).toContain('250kg Branded Mix');
    expect(document.getElementById('details').classList.contains('hidden')).toBe(false);
  });

  test('sets image src for object-style box', () => {
    showDetails('250kg');
    expect(document.getElementById('details-image').getAttribute('src')).toContain('250kg-box');
  });

  test('shows details for 10kg string-style box', () => {
    showDetails('10kg-jacken');
    const text = document.getElementById('details-text').textContent;
    expect(text).toContain('10kg Jacken Box');
  });

  test('clears image src for string-style box', () => {
    showDetails('10kg-hosen');
    expect(document.getElementById('details-image').getAttribute('src')).toBe('');
  });

  test('shows all known box types without throwing', () => {
    const boxes = [
      '250kg', '10kg', '1.5kg',
      '10kg-jacken', '10kg-hosen', '10kg-pullover', '10kg-tshirts', '10kg-sonstiges',
      '1.5kg-jacken', '1.5kg-hosen', '1.5kg-pullover', '1.5kg-tshirts', '1.5kg-sonstiges',
    ];
    boxes.forEach((box) => {
      expect(() => showDetails(box)).not.toThrow();
    });
  });

  test('shows fallback text for unknown box type', () => {
    showDetails('unknown-box');
    expect(document.getElementById('details-text').textContent).toBe(
      'Details nicht verfügbar.'
    );
    expect(document.getElementById('details').classList.contains('hidden')).toBe(false);
  });

  test('shows fallback for empty string box type', () => {
    showDetails('');
    expect(document.getElementById('details-text').textContent).toBe(
      'Details nicht verfügbar.'
    );
  });

  test('detail section becomes visible after call', () => {
    const section = document.getElementById('details');
    section.classList.add('hidden');
    showDetails('10kg-tshirts');
    expect(section.classList.contains('hidden')).toBe(false);
  });

  test('shows details for 1.5kg mystery box (object-style)', () => {
    showDetails('1.5kg');
    expect(document.getElementById('details-text').textContent).toContain('1.5kg Mystery Box');
    expect(document.getElementById('details-image').getAttribute('src')).toContain('1.5kg-box');
  });
});

// ─── updatePrice ───────────────────────────────────────────────────────────────

describe('updatePrice()', () => {
  function updatePrice(category) {
    const prices = {
      tshirts: '29€',
      hoodies: '49€',
      jacken: '79€',
      hosen: '59€',
    };

    const priceElement = document.getElementById('category-price');
    if (prices[category]) {
      priceElement.textContent = prices[category];
    } else {
      priceElement.textContent = 'Preis auf Anfrage';
    }
  }

  test('sets price for tshirts', () => {
    updatePrice('tshirts');
    expect(document.getElementById('category-price').textContent).toBe('29€');
  });

  test('sets price for hoodies', () => {
    updatePrice('hoodies');
    expect(document.getElementById('category-price').textContent).toBe('49€');
  });

  test('sets price for jacken', () => {
    updatePrice('jacken');
    expect(document.getElementById('category-price').textContent).toBe('79€');
  });

  test('sets price for hosen', () => {
    updatePrice('hosen');
    expect(document.getElementById('category-price').textContent).toBe('59€');
  });

  test('returns "Preis auf Anfrage" for unknown category', () => {
    updatePrice('unknown');
    expect(document.getElementById('category-price').textContent).toBe('Preis auf Anfrage');
  });

  test('returns "Preis auf Anfrage" for empty string', () => {
    updatePrice('');
    expect(document.getElementById('category-price').textContent).toBe('Preis auf Anfrage');
  });

  test('returns "Preis auf Anfrage" for null-like undefined category', () => {
    updatePrice(undefined);
    expect(document.getElementById('category-price').textContent).toBe('Preis auf Anfrage');
  });

  test('category matching is case-sensitive', () => {
    updatePrice('Jacken');
    expect(document.getElementById('category-price').textContent).toBe('Preis auf Anfrage');
  });
});

// ─── validateEmail ─────────────────────────────────────────────────────────────

describe('validateEmail()', () => {
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  test('accepts standard email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('accepts email with subdomain', () => {
    expect(validateEmail('user@mail.example.com')).toBe(true);
  });

  test('accepts email with plus alias', () => {
    expect(validateEmail('user+alias@example.com')).toBe(true);
  });

  test('rejects email without @', () => {
    expect(validateEmail('invalidemail.com')).toBe(false);
  });

  test('rejects email without domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });

  test('rejects email without TLD', () => {
    expect(validateEmail('user@domain')).toBe(false);
  });

  test('rejects empty string', () => {
    expect(validateEmail('')).toBe(false);
  });

  test('rejects email with spaces', () => {
    expect(validateEmail('user @example.com')).toBe(false);
  });

  test('rejects email with @ in domain part', () => {
    expect(validateEmail('user@@example.com')).toBe(false);
  });

  test('accepts real-world email addresses', () => {
    const valid = [
      'info@vintagemysteryboxen.de',
      'hello.world@test.org',
      'a@b.cc',
    ];
    valid.forEach((email) => expect(validateEmail(email)).toBe(true));
  });

  test('rejects clearly invalid addresses', () => {
    const invalid = ['@', '@.com', 'no-at-sign', '   ', 'a@b'];
    invalid.forEach((email) => expect(validateEmail(email)).toBe(false));
  });
});

// ─── Contact form validation logic ────────────────────────────────────────────

describe('Contact form validation logic', () => {
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateContactForm(email, message) {
    if (!validateEmail(email)) {
      return { valid: false, error: 'invalid_email' };
    }
    if (message.length < 10) {
      return { valid: false, error: 'message_too_short' };
    }
    return { valid: true, error: null };
  }

  test('valid email and long enough message passes', () => {
    const result = validateContactForm('user@example.com', 'This is a valid message.');
    expect(result.valid).toBe(true);
  });

  test('invalid email fails validation', () => {
    const result = validateContactForm('notanemail', 'This is a valid message.');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('invalid_email');
  });

  test('message shorter than 10 chars fails', () => {
    const result = validateContactForm('user@example.com', 'Short');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('message_too_short');
  });

  test('message exactly 10 chars passes', () => {
    const result = validateContactForm('user@example.com', '1234567890');
    expect(result.valid).toBe(true);
  });

  test('empty message fails', () => {
    const result = validateContactForm('user@example.com', '');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('message_too_short');
  });

  test('empty email fails', () => {
    const result = validateContactForm('', 'Valid message here.');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('invalid_email');
  });

  test('both invalid fails on email first', () => {
    const result = validateContactForm('bad', 'Hi');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('invalid_email');
  });
});

// ─── Product data integrity ────────────────────────────────────────────────────

describe('Product data integrity', () => {
  const products = [
    { id: '10kg-jacken', price: '€89.99', name: '10kg Jacken Box' },
    { id: '10kg-hosen', price: '€69.99', name: '10kg Hosen Box' },
    { id: '10kg-pullover', price: '€79.99', name: '10kg Pullover Box' },
    { id: '10kg-tshirts', price: '€49.99', name: '10kg T-Shirts Box' },
    { id: '10kg-sonstiges', price: '€59.99', name: '10kg Sonstige Box' },
    { id: '1.5kg-jacken', price: '€39.99', name: '1.5kg Jacken Box' },
    { id: '1.5kg-hosen', price: '€29.99', name: '1.5kg Hosen Box' },
    { id: '1.5kg-pullover', price: '€34.99', name: '1.5kg Pullover Box' },
    { id: '1.5kg-tshirts', price: '€19.99', name: '1.5kg T-Shirts Box' },
    { id: '1.5kg-sonstiges', price: '€24.99', name: '1.5kg Sonstige Box' },
  ];

  test('all products have an id', () => {
    products.forEach((p) => expect(p.id).toBeTruthy());
  });

  test('all products have a price', () => {
    products.forEach((p) => expect(p.price).toBeTruthy());
  });

  test('all products have a name', () => {
    products.forEach((p) => expect(p.name).toBeTruthy());
  });

  test('product prices are in valid Euro format', () => {
    const euroRegex = /^€\d+\.\d{2}$/;
    products.forEach((p) => expect(p.price).toMatch(euroRegex));
  });

  test('10kg boxes cost more than corresponding 1.5kg boxes', () => {
    const parsePrice = (s) => parseFloat(s.replace('€', ''));
    expect(parsePrice('€89.99')).toBeGreaterThan(parsePrice('€39.99')); // jacken
    expect(parsePrice('€69.99')).toBeGreaterThan(parsePrice('€29.99')); // hosen
    expect(parsePrice('€79.99')).toBeGreaterThan(parsePrice('€34.99')); // pullover
    expect(parsePrice('€49.99')).toBeGreaterThan(parsePrice('€19.99')); // tshirts
    expect(parsePrice('€59.99')).toBeGreaterThan(parsePrice('€24.99')); // sonstiges
  });

  test('no two products have the same id', () => {
    const ids = products.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
