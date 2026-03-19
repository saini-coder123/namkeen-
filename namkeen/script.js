/* ---------- Configuration ---------- */
const STORAGE_CART = 'namkeen_cart_v1';
const STORAGE_LANG = 'namkeen_lang_v1';
const STORAGE_USER = 'namkeen_user_id';
const API_BASE = '';

let products = [];


const translations = {
  en: {
    langLabel: 'EN',
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      services: 'Services',
      contact: 'Contact',
    },
    hero: {
      title: 'Fresh & Crispy',
      highlight: 'Traditional Namkeen',
      subtitle:
        'Made with love in Ahmedabad. Enjoy handcrafted sev, puri, bhujia, mixtures and more.',
      orderNow: 'Order Now',
      explore: 'Explore Products',
    },
    about: {
      title: 'About Us',
      description:
        'At [Your Brand Name], we bring you the authentic taste of Gujarati snacks made with premium ingredients and traditional recipes. Our snacks are crunchy, flavorful, and perfect for every occasion.',
    },
    products: {
      title: 'Our Products',
      subtitle: 'Pick your favourites. We pack snacks fresh every day.',
    },
    product: {
      sev: { name: 'Sev', price: '₹120 / 250g' },
      puri: { name: 'Puri', price: '₹100 / 200g' },
      bhujia: { name: 'Bhujia', price: '₹130 / 250g' },
      mixture: { name: 'Mixture', price: '₹140 / 250g' },
      addToCart: 'Add to Cart',
    },
    services: {
      title: 'Services',
      subtitle: 'Everything you need for home snacking and business servings.',
      bulk: {
        title: 'Bulk Orders',
        description: 'Planning a party or event? Order in bulk with special pricing.',
      },
      wholesale: {
        title: 'Wholesale Supply',
        description: 'Retailers and kirana stores welcome. Reliable supply, always fresh.',
      },
      packaging: {
        title: 'Custom Packaging',
        description:
          'Gift packs, branded packets or party favors—made just the way you want.',
      },
    },
    gallery: {
      title: 'Gallery',
      subtitle: 'Snacks that look as good as they taste.',
    },
    testimonials: {
      title: 'Testimonials',
      subtitle: 'What our happy customers say.',
      review1:
        '“The best namkeen in Ahmedabad! The crunch is unmatched and the flavours are spot on. Always a pleasure to order.”',
      review1Meta: 'Home Baker',
      review2:
        '“We stock these snacks in our store and they sell out every week. Customers love the freshness and packaging.”',
      review2Meta: 'Shop Owner',
      review3:
        '“Great service and the bulk order arrived right on time. Packaging was neat and everything tasted delicious.”',
      review3Meta: 'Event Planner',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Ready to place an order or have a question? Reach out and we’ll get back quickly.',
      phoneTitle: 'Phone',
      phone: '+91 98765 43210',
      whatsappTitle: 'WhatsApp',
      whatsappLink: 'Chat on WhatsApp',
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'you@example.com',
        messageLabel: 'Message',
        messagePlaceholder: "Tell us what you'd like...",
        send: 'Send Message',
        note: 'We respond within 24 hours. Your info stays private.',
      },
    },
    whatsapp: {
      button: 'Order Now',
    },
    messages: {
      cartAdded: 'Added to cart! 🎉',
      orderPlaced: 'Order placed! We will contact you soon.',
      orderError: 'Unable to place order. Please try again.',
      fixErrors: 'Please fix the highlighted errors.',
      addCartFirst: 'Add items to your cart first.',
      fillRequired: 'Please fill in all required details.',
      messageSent: 'Message sent successfully!',
    },
    errors: {
      required: 'This field is required.',
      invalidEmail: 'Please enter a valid email.',
    },
    cart: {
      title: 'Your Cart',
      empty: 'Your cart is empty. Add some snacks!',
      subtotal: 'Subtotal',
      checkout: 'Proceed to Checkout',
    },
    checkout: {
      title: 'Checkout',
      subtitle: 'Review your order and fill in delivery details.',
      nameLabel: 'Name',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      addressLabel: 'Delivery address',
      notesLabel: 'Notes (optional)',
      placeOrder: 'Place Order',
      note: "We'll contact you to confirm and schedule delivery.",
    },
    footer: {
      brand: '[Your Brand Name]',
      tagline: 'Authentic Namkeen from Ahmedabad.',
      copy: '© {{year}} [Your Brand Name]. All rights reserved.',
    },
  },
  hi: {
    langLabel: 'हिंदी',
    nav: {
      home: 'मुख्य पृष्ठ',
      about: 'हमारे बारे में',
      products: 'उत्पाद',
      services: 'सेवाएँ',
      contact: 'संपर्क',
    },
    hero: {
      title: 'ताज़ा और कुरकुरा',
      highlight: 'पारंपरिक नमकीन',
      subtitle:
        'अहमदाबाद में प्यार से बनाया गया। सेव, पूरी, भुजिया, मिश्रण और भी बहुत कुछ का आनंद लें।',
      orderNow: 'अभी ऑर्डर करें',
      explore: 'उत्पाद देखें',
    },
    about: {
      title: 'हमारे बारे में',
      description:
        '[Your Brand Name] में, हम आपको प्रीमियम सामग्री और पारंपरिक रेसिपी से बने गुजरात के स्नैक्स का असली स्वाद देते हैं। हमारे स्नैक्स कुरकुरे, स्वादिष्ट और हर अवसर के लिए परफेक्ट हैं।',
    },
    products: {
      title: 'हमारे उत्पाद',
      subtitle: 'अपने पसंदीदा चुनें। हम हर दिन ताज़ा पैक करते हैं।',
    },
    product: {
      sev: { name: 'सेव', price: '₹120 / 250g' },
      puri: { name: 'पुरी', price: '₹100 / 200g' },
      bhujia: { name: 'भुजिया', price: '₹130 / 250g' },
      mixture: { name: 'मिक्सचर', price: '₹140 / 250g' },
      addToCart: 'कार्ट में डालें',
    },
    services: {
      title: 'सेवाएँ',
      subtitle: 'घर पर स्नैकिंग और व्यापारिक सर्विंग्स के लिए सभी सुविधाएँ।',
      bulk: {
        title: 'बुल्क ऑर्डर',
        description: 'पार्टी या इवेंट की योजना बना रहे हैं? बड़े पैमाने पर ऑर्डर करें।',
      },
      wholesale: {
        title: 'थोक आपूर्ति',
        description: 'खुदरा विक्रेता और किराना स्टोर स्वागत है। हमेशा ताज़ा आपूर्ति।',
      },
      packaging: {
        title: 'कस्टम पैकेजिंग',
        description: 'गिफ्ट पैक, ब्रांडेड पैकेट या पार्टी फेवर्स—जैसा आप चाहें वैसा।',
      },
    },
    gallery: {
      title: 'गैलरी',
      subtitle: 'वे स्नैक्स जो दिखने में जितने अच्छे हैं, खाने में उतने ही अच्छे।',
    },
    testimonials: {
      title: 'ग्राहक समीक्षाएँ',
      subtitle: 'हमारे खुश ग्राहकों ने क्या कहा।',
      review1:
        '“अहमदाबाद में सबसे अच्छा नमकीन! कुरकुरापन अद्वितीय है और स्वाद जबरदस्त है। हमेशा ऑर्डर करने में खुशी होती है।”',
      review1Meta: 'होम बेकर',
      review2:
        '“हम अपने स्टोर में ये स्नैक्स रखते हैं और यह हर हफ्ते बिक जाता है। ग्राहक ताजगी और पैकेजिंग को पसंद करते हैं।”',
      review2Meta: 'दुकानदार',
      review3:
        '“शानदार सेवा और बड़ा ऑर्डर समय पर पहुंचा। पैकेजिंग साफ थी और सब कुछ स्वादिष्ट था।”',
      review3Meta: 'इवेंट प्लानर',
    },
    contact: {
      title: 'संपर्क करें',
      subtitle: 'ऑर्डर देने के लिए तैयार हैं या कोई सवाल है? संपर्क करें और हम जल्दी जवाब देंगे।',
      phoneTitle: 'फोन',
      phone: '+91 98765 43210',
      whatsappTitle: 'व्हाट्सएप',
      whatsappLink: 'व्हाट्सएप पर चैट करें',
      form: {
        nameLabel: 'नाम',
        namePlaceholder: 'आपका नाम',
        emailLabel: 'ईमेल',
        emailPlaceholder: 'you@example.com',
        messageLabel: 'संदेश',
        messagePlaceholder: 'हमें बताएं कि आप क्या चाहते हैं...',
        send: 'संदेश भेजें',
        note: 'हम 24 घंटे के भीतर जवाब देते हैं। आपकी जानकारी निजी रहती है।',
      },
    },
    whatsapp: {
      button: 'अब आदेश करें',
    },
    messages: {
      cartAdded: 'कार्ट में जोड़ा गया! 🎉',
      orderPlaced: 'ऑर्डर किया गया! हम जल्द ही आपसे संपर्क करेंगे।',
      orderError: 'ऑर्डर करने में असमर्थ। कृपया पुनः प्रयास करें।',
      fixErrors: 'कृपया हाइलाइट की गई त्रुटियों को ठीक करें।',
      addCartFirst: 'पहले अपनी टोकरी में आइटम जोड़ें।',
      fillRequired: 'कृपया सभी आवश्यक विवरण भरें।',
      messageSent: 'संदेश सफलतापूर्वक भेज दिया गया!',
    },
    errors: {
      required: 'यह फ़ील्ड आवश्यक है।',
      invalidEmail: 'कृपया एक मान्य ईमेल दर्ज करें।',
    },
    cart: {
      title: 'आपकी टोकरी',
      empty: 'आपकी टोकरी खाली है। कुछ स्नैक्स जोड़ें!',
      subtotal: 'उप-योग',
      checkout: 'चेकआउट करें',
    },
    checkout: {
      title: 'चेकआउट',
      subtitle: 'अपने ऑर्डर की समीक्षा करें और डिलीवरी विवरण भरें।',
      nameLabel: 'नाम',
      phoneLabel: 'फोन',
      emailLabel: 'ईमेल',
      addressLabel: 'डिलीवरी का पता',
      notesLabel: 'टिप्पणियाँ (वैकल्पिक)',
      placeOrder: 'ऑर्डर करें',
      note: 'हम पुष्टि करने और डिलीवरी शेड्यूल करने के लिए आपसे संपर्क करेंगे।',
    },
    footer: {
      brand: '[Your Brand Name]',
      tagline: 'अहमदाबाद का प्रामाणिक नमकीन।',
      copy: '© {{year}} [Your Brand Name]. सर्वाधिकार सुरक्षित।',
    },
  },
  gu: {
    langLabel: 'ગુજરાતી',
    nav: {
      home: 'હોમ',
      about: 'અમારા વિશે',
      products: 'ઉત્પાદનો',
      services: 'સેવાઓ',
      contact: 'સંપર્ક કરો',
    },
    hero: {
      title: 'તાજું અને ખળભળતું',
      highlight: 'પરંપરાગત નમકીન',
      subtitle:
        'અમદાવાદમાં પ્રેમથી બનાવાયેલું. સેવ, પુરી, ભુજિયા, મિશ્રણ અને વધુનો આનંદ લો.',
      orderNow: 'હવે ઓર્ડર કરો',
      explore: 'ઉત્પાદનો જુઓ',
    },
    about: {
      title: 'અમારા વિશે',
      description:
        '[Your Brand Name] માં, અમે તમને ગુજરાતી નાસ્તાના વાસ્તવિક સ્વાદ આપીશું જે ઉત્તમ સામગ્રી અને પરંપરાગત રેસીપીથી બનાવાઈ છે. અમારા નાસ્તા ક્રિસ્પી, સ્વાદિષ્ટ અને દરેક પ્રસંગ માટે પરફેક્ટ છે.',
    },
    products: {
      title: 'અમારા ઉત્પાદનો',
      subtitle: 'તમારા પ્રિય વસ્તુઓ પસંદ કરો. અમે રોજ તાજું પેક કરીએ છીએ.',
    },
    product: {
      sev: { name: 'સેવ', price: '₹120 / 250g' },
      puri: { name: 'પુરિ', price: '₹100 / 200g' },
      bhujia: { name: 'ભુજીયા', price: '₹130 / 250g' },
      mixture: { name: 'મિશ્રણ', price: '₹140 / 250g' },
      addToCart: 'કાર્ટમાં ઉમેરો',
    },
    services: {
      title: 'સેવાઓ',
      subtitle: 'ઘરે નાસ્તા અને વેપારી સેવાઓ માટે બધું જ ઉપલબ્ધ છે.',
      bulk: {
        title: 'બલ્ક ઓર્ડર',
        description: 'પાર્ટી અથવા ઇવેન્ટ પ્રణાળી? વિશેષ ભાવે મોટા ઓર્ડર કરો.',
      },
      wholesale: {
        title: 'થોક સપ્લાય',
        description: 'રિટેલર્સ અને કિરાણા સ્ટોર માટે માન્ય. હંમેશા તાજી સપ્લાય.',
      },
      packaging: {
        title: 'કસ્ટમ પેકેજિંગ',
        description: 'ગિફ્ટ પેક, બ્રાન્ડેડ પેકેટ અથવા પાર્ટી ફેવર્સ―જેમ તમે ઇચ્છો તેમ.',
      },
    },
    gallery: {
      title: 'ગૅલરી',
      subtitle: 'એવા નાસ્તા જે દેખાતામાં જેટલાં સરસ છે, સ્વાદમાં એટલા જ સરસ છે.',
    },
    testimonials: {
      title: 'ગ્રાહક ટિપ્પણીઓ',
      subtitle: 'અમારા ખુશ ગ્રાહકો શું કહે છે.',
      review1:
        '“અમદાવાદનું શ્રેષ્ઠ નમકીન! ક્રંચ અનામી છે અને સ્વાદ ખૂબ જ સરસ છે. ઓર્ડર કરવું હંમેશા આનંદદાયક છે.”',
      review1Meta: 'હોમ બેકર',
      review2:
        '“આ નાસ્તાઓ અમે અમારી દુકાનમાં રાખીએ છીએ અને તે દર અઠવાડિયે વેચાઈ જાય છે. ગ્રાહકો તાજીતાના અને પેકેજિંગનું વખાણ કરે છે.”',
      review2Meta: 'દુકાનદાર',
      review3:
        '“શાનદાર સેવા અને મોટો ઓર્ડર સમયસર પહોંચ્યો. પેકેજિંગ સાફ હતું અને બધું સ્વાદિષ્ટ હતું.”',
      review3Meta: 'ઇવેન્ટ પ્લાનર',
    },
    contact: {
      title: 'સંપર્ક',
      subtitle: 'ઓર્ડર આપવા માટે તૈયાર છો અથવા કોઈ પ્રશ્ન છે? સંપર્ક કરો અને અમે ઝડપથી જવાબ આપવા પ્રયત્ન કરીશું.',
      phoneTitle: 'ફોન',
      phone: '+91 98765 43210',
      whatsappTitle: 'WhatsApp',
      whatsappLink: 'WhatsApp પર ચેટ કરો',
      form: {
        nameLabel: 'નામ',
        namePlaceholder: 'તમારું નામ',
        emailLabel: 'ઇમેઇલ',
        emailPlaceholder: 'you@example.com',
        messageLabel: 'સંદેશ',
        messagePlaceholder: 'તમને શું જોઈએ છે તે જણાવો...',
        send: 'સંદેશ મોકલો',
        note: 'અમે 24 કલાકમાં જવાબ આપીએ છીએ. તમારી માહિતી ખાનગી રહેશે.',
      },
    },
    whatsapp: {
      button: 'હવે ઓર્ડર કરો',
    },
    messages: {
      cartAdded: 'કાર્ટમાં ઉમેરાયું! 🎉',
      orderPlaced: 'ઓર્ડર પૂર્ણ થયું! અમે ઝડપથી સંપર્ક કરીશું.',
      orderError: 'ઓર્ડર આપવા સક્ષમ નથી. કૃપા કરીને ફરીથી પ્રયત્ન કરો.',
      fixErrors: 'કૃપા કરીને હાઇલાઇટ કરેલા ભૂલોને ઠીક કરો.',
      addCartFirst: 'સૌપ્રથમ તમારા કાર્ટમાં વસ્તુઓ ઉમેરો.',
      fillRequired: 'કૃપા કરીને તમામ જરૂરી વિગતો ભરશો.',
      messageSent: 'સંદેશ સફળતાપૂર્વક મોકલવામાં આવ્યો!',
    },
    errors: {
      required: 'આ વિષય જરૂરી છે.',
      invalidEmail: 'કૃપા કરીને માન્ય ઇમેઇલ દાખલ કરો.',
    },
    cart: {
      title: 'તમારી ટોકરી',
      empty: 'તમારી ટોકરી খালি છે. થોડી નાસ્તા ઉમેરો!',
      subtotal: 'કુલ',
      checkout: 'ચેકઆઉટ કરો',
    },
    checkout: {
      title: 'ચેકઆઉટ',
      subtitle: 'તમારો ઓર્ડર ચકાસો અને ડિલિવરી વિગતો ભરો.',
      nameLabel: 'નામ',
      phoneLabel: 'ફોન',
      emailLabel: 'ઇમેઇલ',
      addressLabel: 'ડિલિવરી સરનામું',
      notesLabel: 'ટિપ્પણીઓ (વૈકલ્પિક)',
      placeOrder: 'ઓર્ડર કરો',
      note: 'આપણ આતમ ધારણા કરીશું અને ડિલિવરી સમય નક્કી કરવા માટે સંપર્ક કરીશું.',
    },
    footer: {
      brand: '[Your Brand Name]',
      tagline: 'અમદાવાદનું પ્રામાણિક નમકીન.',
      copy: '© {{year}} [Your Brand Name]. બધા અધિકારો સુરક્ષિત છે.',
    },
  },
};

// ---------- Helpers ----------
function getStoredCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_CART) || '[]');
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
}

function getStoredLang() {
  const saved = localStorage.getItem(STORAGE_LANG);
  return saved || 'en';
}

function saveLang(lang) {
  localStorage.setItem(STORAGE_LANG, lang);
}

function getUserId() {
  let id = localStorage.getItem(STORAGE_USER);
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(STORAGE_USER, id);
  }
  return id;
}

function mergeCarts(localCart, remoteCart) {
  const merged = [...localCart];
  remoteCart.forEach((remoteItem) => {
    const existing = merged.find((item) => item.id === remoteItem.id);
    if (existing) {
      existing.quantity = Math.max(existing.quantity, remoteItem.quantity);
    } else {
      merged.push(remoteItem);
    }
  });
  return merged;
}

async function syncCartToServer(cart) {
  const userId = getUserId();
  try {
    await fetch(`${API_BASE}/api/cart/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart),
    });
  } catch (error) {
    // ignore network errors; cart remains in localStorage
    console.warn('Unable to sync cart:', error);
  }
}

async function loadServerCart() {
  const userId = getUserId();
  try {
    const response = await fetch(`${API_BASE}/api/cart/${userId}`);
    if (!response.ok) return [];
    const serverCart = await response.json();
    return Array.isArray(serverCart) ? serverCart : [];
  } catch (error) {
    return [];
  }
}

async function loadProducts() {
  try {
    const response = await fetch(`${API_BASE}/api/products`);
    if (!response.ok) throw new Error('Failed to load products');
    products = await response.json();
  } catch (error) {
    console.warn('Unable to fetch products:', error);
    // keep existing products if fetch fails
  }
  renderProducts();
}

function formatCurrency(value) {
  return `₹${value}`;
}

function renderProducts() {
  const container = document.getElementById('productGrid');
  if (!container) return;

  const lang = getStoredLang();
  const addText = t('product.addToCart', 'Add to Cart');

  container.innerHTML = '';

  products.forEach((product) => {
    const name = product.name?.[lang] || product.name?.en || 'Unnamed';
    const priceLine = `${formatCurrency(product.price)} / ${product.unit || ''}`.trim();

    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.productId = product.id;

    card.innerHTML = `
      <img src="${product.image}" alt="${name}" />
      <div class="card__content">
        <h4>${name}</h4>
        <p class="price">${priceLine}</p>
        <button class="btn btn--primary btn--block add-cart" data-product-id="${product.id}">${addText}</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function getProduct(productId) {
  return products.find((item) => item.id === productId);
}

function getCartTotal(cart) {
  return cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);
}

function updateCartCount(cart) {
  const countEl = document.getElementById('cartCount');
  if (!countEl) return;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  countEl.textContent = String(totalItems);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toast._timer);
  toast._timer = window.setTimeout(() => toast.classList.remove('show'), 2300);
}

function applyTranslations(lang) {
  const dataset = translations[lang] || translations.en;
  document.documentElement.lang = lang;

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;

    const value = key.split('.').reduce((obj, part) => (obj ? obj[part] : undefined), dataset);
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = key?.split('.').reduce((obj, part) => (obj ? obj[part] : undefined), dataset);
    if (value !== undefined) {
      el.setAttribute('placeholder', value);
    }
  });

  // Re-render product cards to update language
  renderProducts();

  // Update language label on the toggle
  const langLabel = document.querySelector('.lang-switcher__label');
  if (langLabel) {
    langLabel.textContent = dataset.langLabel;
  }

  // Update footer copy with year
  const footerCopy = document.querySelector('[data-i18n="footer.copy"]');
  if (footerCopy) {
    const year = new Date().getFullYear();
    footerCopy.textContent = dataset.footer.copy.replace('{{year}}', year);
  }
}

function t(key, fallback = '') {
  const lang = getStoredLang();
  const dataset = translations[lang] || translations.en;
  const value = key.split('.').reduce((obj, part) => (obj ? obj[part] : undefined), dataset);
  return value !== undefined ? value : fallback;
}

function setLanguage(lang) {
  const normalized = translations[lang] ? lang : 'en';
  applyTranslations(normalized);
  saveLang(normalized);
}

// ---------- Cart UI ----------
function renderCart(cart) {
  const cartItemsEl = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('cartSubtotal');
  const checkoutBtn = document.getElementById('checkoutButton');

  if (!cartItemsEl || !subtotalEl || !checkoutBtn) return;

  cartItemsEl.innerHTML = '';

  if (cart.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'cart-sidebar__empty';
    empty.setAttribute('data-i18n', 'cart.empty');
    empty.textContent = translations[getStoredLang()]?.cart?.empty || 'Your cart is empty. Add some snacks!';
    cartItemsEl.appendChild(empty);
    checkoutBtn.disabled = true;
    subtotalEl.textContent = formatCurrency(0);
    return;
  }

  cart.forEach((item) => {
    const product = getProduct(item.id);
    if (!product) return;

    const card = document.createElement('div');
    card.className = 'cart-item';
    card.dataset.productId = item.id;

    card.innerHTML = `
      <img class="cart-item__img" src="${product.image}" alt="${product.name[getStoredLang()] || product.name.en}" />
      <div>
        <p class="cart-item__name">${product.name[getStoredLang()] || product.name.en}</p>
        <p class="cart-item__meta"><span class="cart-item__qty">${item.quantity}</span> × ${formatCurrency(product.price)}</p>
        <div class="cart-item__actions">
          <button type="button" class="btn btn--ghost cart-item__decrease" aria-label="Decrease quantity"><i class="fas fa-minus"></i></button>
          <span class="cart-item__quantity">${item.quantity}</span>
          <button type="button" class="btn btn--ghost cart-item__increase" aria-label="Increase quantity"><i class="fas fa-plus"></i></button>
          <button type="button" class="btn btn--ghost cart-item__remove" aria-label="Remove item"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;

    cartItemsEl.appendChild(card);
  });

  subtotalEl.textContent = formatCurrency(getCartTotal(cart));
  checkoutBtn.disabled = false;

  // Re-apply translations for item names
  applyTranslations(getStoredLang());
}

function getCart() {
  return getStoredCart();
}

function setCart(cart) {
  saveCart(cart);
  updateCartCount(cart);
  renderCart(cart);
  syncCartToServer(cart);
}

function addToCart(id, amount = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += amount;
  } else {
    cart.push({ id, quantity: amount });
  }
  setCart(cart);
  showToast(t('messages.cartAdded', 'Added to cart! 🎉'));
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);
  setCart(cart);
}

function updateCartQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === id);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  setCart(cart);
}

function openCart() {
  const sidebar = document.getElementById('cartSidebar');
  const backdrop = document.getElementById('cartBackdrop');
  sidebar?.classList.add('open');
  backdrop?.classList.add('show');
  sidebar?.setAttribute('aria-hidden', 'false');
  backdrop?.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  const sidebar = document.getElementById('cartSidebar');
  const backdrop = document.getElementById('cartBackdrop');
  sidebar?.classList.remove('open');
  backdrop?.classList.remove('show');
  sidebar?.setAttribute('aria-hidden', 'true');
  backdrop?.setAttribute('aria-hidden', 'true');
}

function openCheckout() {
  const modal = document.getElementById('checkoutModal');
  modal?.classList.add('open');
  modal?.setAttribute('aria-hidden', 'false');
  renderOrderSummary(getCart());
}

function closeCheckout() {
  const modal = document.getElementById('checkoutModal');
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
}

function renderOrderSummary(cart) {
  const summary = document.getElementById('orderSummary');
  if (!summary) return;

  if (cart.length === 0) {
    summary.innerHTML = '<p style="margin:0;">No items in cart.</p>';
    return;
  }

  const items = cart
    .map((item) => {
      const product = getProduct(item.id);
      if (!product) return '';
      return `
        <div class="order-summary__item">
          <span>${product.name[getStoredLang()] || product.name.en} × ${item.quantity}</span>
          <span>${formatCurrency(product.price * item.quantity)}</span>
        </div>
      `;
    })
    .join('');

  const total = formatCurrency(getCartTotal(cart));

  summary.innerHTML = `
    <div class="order-summary">
      <h4 data-i18n="checkout.title">Order summary</h4>
      ${items}
      <div class="order-summary__total">
        <span data-i18n="cart.subtotal">Subtotal</span>
        <span>${total}</span>
      </div>
    </div>
  `;
  applyTranslations(getStoredLang());
}

// ---------- Form helpers ----------
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function showInputError(input, message) {
  const error = input.parentElement.querySelector('.form__error');
  if (!error) return;
  error.textContent = message;
  input.classList.add('input--error');
}

function clearInputError(input) {
  const error = input.parentElement.querySelector('.form__error');
  if (!error) return;
  error.textContent = '';
  input.classList.remove('input--error');
}

function validateCheckoutForm() {
  const name = document.getElementById('orderName');
  const phone = document.getElementById('orderPhone');
  const email = document.getElementById('orderEmail');
  const address = document.getElementById('orderAddress');

  const lang = getStoredLang();
  const dict = translations[lang]?.checkout ?? translations.en.checkout;
  const errors = [];

  if (!name.value.trim()) {
      showInputError(name, t('errors.required', 'This field is required.'));
      errors.push('name');
    } else {
      clearInputError(name);
    }

    if (!phone.value.trim()) {
      showInputError(phone, t('errors.required', 'This field is required.'));
      errors.push('phone');
    } else {
      clearInputError(phone);
    }

    if (!email.value.trim() || !validateEmail(email.value)) {
      showInputError(email, t('errors.invalidEmail', 'Please enter a valid email.'));
      errors.push('email');
    } else {
      clearInputError(email);
    }

    if (!address.value.trim()) {
      showInputError(address, t('errors.required', 'This field is required.'));
  } else {
    clearInputError(address);
  }

  return errors.length === 0;
}

function resetCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (form) form.reset();
}

// ---------- Initialization ----------
function initSmoothScroll() {
  const smoothLinks = document.querySelectorAll('a[href^="#"], button[data-scroll]');
  smoothLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      const targetId = href?.startsWith('#') ? href.slice(1) : link.dataset.scroll;
      if (!targetId) return;
      event.preventDefault();
      const target = document.getElementById(targetId);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initMobileNav() {
  const toggle = document.getElementById('mobileNavToggle');
  const nav = document.getElementById('nav');
  toggle?.addEventListener('click', () => nav?.classList.toggle('show'));
}

function initLangSwitcher() {
  const toggle = document.getElementById('langToggle');
  const menu = document.getElementById('langMenu');
  const switcher = document.getElementById('langSwitcher');

  toggle?.addEventListener('click', () => {
    switcher.classList.toggle('open');
  });

  document.addEventListener('click', (event) => {
    if (!switcher.contains(event.target)) {
      switcher.classList.remove('open');
    }
  });

  menu?.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.getAttribute('data-lang');
      if (selected) {
        setLanguage(selected);
      }
      switcher.classList.remove('open');
    });
  });
}

function initCartEvents() {
  const cartButton = document.getElementById('cartButton');
  const closeButton = document.getElementById('closeCart');
  const backdrop = document.getElementById('cartBackdrop');
  const checkoutButton = document.getElementById('checkoutButton');

  cartButton?.addEventListener('click', openCart);
  closeButton?.addEventListener('click', closeCart);
  backdrop?.addEventListener('click', closeCart);

  document.body.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('.add-cart') || target.closest('.add-cart')) {
      const button = target.closest('.add-cart');
      const productId = button?.getAttribute('data-product-id');
      if (productId) {
        addToCart(productId, 1);
      }
    }

    if (target.matches('.cart-item__increase')) {
      const card = target.closest('.cart-item');
      if (card?.dataset.productId) {
        updateCartQuantity(card.dataset.productId, 1);
      }
    }

    if (target.matches('.cart-item__decrease')) {
      const card = target.closest('.cart-item');
      if (card?.dataset.productId) {
        updateCartQuantity(card.dataset.productId, -1);
      }
    }

    if (target.matches('.cart-item__remove')) {
      const card = target.closest('.cart-item');
      if (card?.dataset.productId) {
        removeFromCart(card.dataset.productId);
      }
    }
  });

  checkoutButton?.addEventListener('click', () => {
    const cart = getCart();
    if (cart.length === 0) {
      showToast(t('messages.addCartFirst', 'Add items to your cart first.'));
      return;
    }
    openCheckout();
  });
}

function initCheckoutForm() {
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutClose = document.getElementById('checkoutClose');

  checkoutClose?.addEventListener('click', closeCheckout);

  if (!checkoutForm) return;

  checkoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateCheckoutForm()) {
      showToast(t('messages.fillRequired', 'Please fill in all required details.'));
      return;
    }

    const cart = getCart();
    if (cart.length === 0) {
      showToast(t('messages.addCartFirst', 'Add items to your cart first.'));
      return;
    }

    const submitButton = checkoutForm.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    const payload = {
      userId: getUserId(),
      items: cart,
      total: getCartTotal(cart),
      customer: {
        name: document.getElementById('orderName')?.value.trim() || '',
        phone: document.getElementById('orderPhone')?.value.trim() || '',
        email: document.getElementById('orderEmail')?.value.trim() || '',
        address: document.getElementById('orderAddress')?.value.trim() || '',
        notes: document.getElementById('orderNotes')?.value.trim() || '',
      },
    };

    try {
      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Order request failed');

      showToast(t('messages.orderPlaced', 'Order placed! We will contact you soon.'));
      setCart([]);
      resetCheckoutForm();
      closeCheckout();
    } catch (error) {
      console.warn('Order submission failed:', error);
      showToast(t('messages.orderError', 'Unable to place order. Please try again.'));
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let valid = true;

    if (!name.value.trim()) {
      showInputError(name, t('errors.required', 'This field is required.'));
      valid = false;
    } else {
      clearInputError(name);
    }

    if (!email.value.trim() || !validateEmail(email.value)) {
      showInputError(email, t('errors.invalidEmail', 'Please enter a valid email.'));
      valid = false;
    } else {
      clearInputError(email);
    }

    if (!message.value.trim()) {
      showInputError(message, t('errors.required', 'This field is required.'));
      valid = false;
    } else {
      clearInputError(message);
    }

    if (!valid) {
      showToast(t('messages.fixErrors', 'Please fix the highlighted errors.'));
      return;
    }

    showToast(t('messages.messageSent', 'Message sent successfully!'));
    form.reset();
  });
}

function initScrollReveal() {
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el) => observer.observe(el));
}

async function init() {
  const savedLang = getStoredLang();

  await loadProducts();
  setLanguage(savedLang);

  initSmoothScroll();
  initMobileNav();
  initLangSwitcher();
  initCartEvents();
  initCheckoutForm();
  initContactForm();
  initScrollReveal();

  const localCart = getCart();
  const serverCart = await loadServerCart();
  const mergedCart = mergeCarts(localCart, serverCart);
  setCart(mergedCart);

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

window.addEventListener('DOMContentLoaded', init);
