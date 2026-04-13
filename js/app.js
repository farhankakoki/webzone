// ============================================================
// APP.JS — Webzone Digital Service Hub
// Core Application Logic
// ============================================================

// ---- STATE ----
let currentLang = localStorage.getItem('wz_lang') || 'en';
let currentCat = 'all';
let allServicesVisible = false;
const SERVICES_INITIAL = 9; // Show first 9 services

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  showSkeletons();
  applyLanguage(currentLang, false);
  initNavbar();
  initHeroSlider();
  renderServices('all');
  renderFAQ();
  fetchNews();
  initContactForm();
  initSearch();
  initLangSwitcher();
  initScrollAnimations();
  initStatCounter();
  populateServiceSelect();
});

// ============================================================
//  LANGUAGE SYSTEM
// ============================================================
function applyLanguage(lang, reRender = true) {
  currentLang = lang;
  localStorage.setItem('wz_lang', lang);
  document.documentElement.lang = lang;
  trackEvent('lang', lang);

  // Update label
  const labels = { en: 'EN', ml: 'ML', hi: 'HI' };
  const el = document.getElementById('langLabel');
  if (el) el.textContent = labels[lang] || 'EN';

  // Active state on lang options
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Apply translations to [data-i18n] elements 
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val && val !== key) el.innerHTML = val;
  });

  // Apply placeholder translations
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const val = t(key);
    if (val && val !== key) el.placeholder = val;
  });

  if (reRender) {
    renderServices(currentCat);
    renderFAQ();
    populateServiceSelect();
  }
}

function initLangSwitcher() {
  const btn = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');

  btn?.addEventListener('click', (e) => {
    e.stopPropagation();
    menu?.classList.toggle('open');
  });

  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      applyLanguage(opt.dataset.lang);
      menu?.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-switch')) {
      menu?.classList.remove('open');
    }
  });
}

// ============================================================
//  NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('mainNav');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const menuIcon = document.getElementById('menuIcon');

  // Sticky scroll
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNavLink();
  });

  // Mobile menu
  mobileBtn?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.toggle('open');
    if (menuIcon) menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav?.classList.remove('open');
      if (menuIcon) menuIcon.className = 'fa-solid fa-bars';
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navH = navbar?.offsetHeight || 70;
          const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    }
  });
}

function updateActiveNavLink() {
  const sections = ['home', 'services', 'about', 'faq', 'news', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = 'services';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active-section', href === current);
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
//  HERO SLIDER
// ============================================================
let heroIndex = 0;
let heroTimer = null;
const SLIDE_DURATION = 5000;

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return; // Exit if no slider

  const dots = document.querySelectorAll('.hero-dot');

  document.getElementById('heroPrev')?.addEventListener('click', () => {
    heroGoTo((heroIndex - 1 + slides.length) % slides.length);
  });
  document.getElementById('heroNext')?.addEventListener('click', () => {
    heroGoTo((heroIndex + 1) % slides.length);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => heroGoTo(parseInt(dot.dataset.slide)));
  });

  startHeroTimer(slides.length);
}

function heroGoTo(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');

  slides[heroIndex]?.classList.remove('active');
  dots[heroIndex]?.classList.remove('active');
  heroIndex = idx;
  slides[heroIndex]?.classList.add('active');
  dots[heroIndex]?.classList.add('active');

  // Re-trigger animation
  const inner = slides[heroIndex]?.querySelector('.hero-slide-inner');
  if (inner) {
    inner.style.animation = 'none';
    inner.offsetHeight; // reflow
    inner.style.animation = '';
  }

  resetHeroTimer(slides.length);
}

function startHeroTimer(total) {
  heroTimer = setInterval(() => {
    heroGoTo((heroIndex + 1) % total);
  }, SLIDE_DURATION);
}

function resetHeroTimer(total) {
  clearInterval(heroTimer);
  startHeroTimer(total);
}

// ============================================================
//  SKELETONS
// ============================================================
function showSkeletons() {
  const sGrid = document.getElementById('servicesGrid');
  const nGrid = document.getElementById('newsGrid');
  
  const sCard = `
    <div class="skeleton-card">
      <div class="skeleton sk-circle"></div>
      <div class="skeleton sk-title"></div>
      <div class="skeleton sk-line"></div>
      <div class="skeleton sk-line-mid"></div>
      <div class="skeleton sk-btn"></div>
    </div>
  `;

  if (sGrid) sGrid.innerHTML = sCard.repeat(6);
  if (nGrid) nGrid.innerHTML = sCard.repeat(3);
}

// ============================================================
//  SERVICES RENDERING + WHATSAPP
// ============================================================
function renderServices(cat) {
  currentCat = cat;

  // Update tab states
  document.querySelectorAll('.srv-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.cat === cat);
  });

  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  const filtered = cat === 'all' ? services : services.filter(s => s.cat === cat);

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">No services found.</div>`;
    return;
  }

  const toShow = allServicesVisible ? filtered : filtered.slice(0, SERVICES_INITIAL);

  grid.innerHTML = toShow.map(s => buildServiceCard(s)).join('');

  // Show More button
  const showMoreWrap = document.getElementById('showMoreWrap');
  if (showMoreWrap) {
    showMoreWrap.style.display = (filtered.length > SERVICES_INITIAL && !allServicesVisible) ? 'block' : 'none';
  }
}

function buildServiceCard(s) {
  const title = s.title[currentLang] || s.title.en;
  const desc = s.desc[currentLang] || s.desc.en;
  const docs = s.docs[currentLang] || s.docs.en;
  const waLabel = t('wa_apply');
  const docsLabel = t('docs_label');
  const catNames = { gov: 'gov', utility: 'utility', financial: 'financial', other: 'other' };
  const catClass = catNames[s.cat] || 'other';
  const featuredBadge = s.featured ? `<span class="srv-feat-badge">⭐ Popular</span>` : '';

  return `
    <div class="srv-card ${s.featured ? 'featured' : ''}">
      <div class="srv-card-top">
        <div class="srv-icon ${catClass}">
          <i class="${s.icon}"></i>
        </div>
        <div class="srv-badges">
          ${featuredBadge}
          <span class="srv-cat-badge ${catClass}">${getCatLabel(s.cat)}</span>
        </div>
      </div>
      <h3 class="srv-title">${title}</h3>
      <p class="srv-desc">${desc}</p>
      <div class="srv-docs">
        <i class="fa-solid fa-folder-open"></i>
        <span><strong>${docsLabel}:</strong> ${docs}</span>
      </div>
      <button class="srv-wa-btn" onclick="openWAModal('${s.id}')">
        <i class="fa-brands fa-whatsapp"></i>
        ${waLabel}
      </button>
    </div>
  `;
}

function getCatLabel(cat) {
  const map = { gov: '🏛', utility: '⚡', financial: '💰', other: '🎫' };
  return map[cat] || '•';
}

// Show More
document.getElementById('showMoreBtn')?.addEventListener('click', () => {
  allServicesVisible = true;
  renderServices(currentCat);
});

// Tab clicks
document.querySelectorAll('.srv-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    allServicesVisible = false;
    renderServices(tab.dataset.cat);
  });
});

// ============================================================
//  WHATSAPP MODAL
// ============================================================
function openWAModal(serviceId) {
  const service = services.find(s => s.id === serviceId);
  if (!service) return;

  const title = service.title[currentLang] || service.title.en;
  const modal = document.getElementById('waModal');
  const modalTitle = document.getElementById('waModalTitle');
  const modalSvc = document.getElementById('waModalService');
  const preview = document.getElementById('waPreview');
  const btn = document.getElementById('waModalBtn');

  if (modalTitle) modalTitle.textContent = t('wa_modal_title');
  if (modalSvc) modalSvc.textContent = title;
  trackEvent('service', title);

  const msgLines = [
    `Hello Webzone! 👋`,
    ``,
    `I need: *${title}*`,
    ``,
    `Name: `,
    `Phone: `,
    `Details: `,
    ``,
    `Please help me with this service.`
  ];
  const msg = msgLines.join('\n');
  const encoded = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encoded}`;

  if (preview) preview.textContent = msg;
  if (btn) btn.href = waUrl;

  modal?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeWAModal() {
  document.getElementById('waModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('waModalClose')?.addEventListener('click', closeWAModal);
document.getElementById('waModal')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('waModal')) closeWAModal();
});

// ============================================================
//  FAQ ACCORDION
// ============================================================
function renderFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;

  list.innerHTML = faqs.map((faq, i) => {
    const q = faq.q[currentLang] || faq.q.en;
    const a = faq.a[currentLang] || faq.a.en;
    return `
      <div class="faq-item" id="faq-${i}">
        <div class="faq-question" onclick="toggleFAQ(${i})">
          <span class="faq-question-text">${q}</span>
          <div class="faq-question-icon"><i class="fa-solid fa-plus"></i></div>
        </div>
        <div class="faq-answer" id="faq-ans-${i}">
          <div class="faq-answer-inner">${a}</div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleFAQ(idx) {
  const item = document.getElementById(`faq-${idx}`);
  const ans = document.getElementById(`faq-ans-${idx}`);
  if (!item || !ans) return;

  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(el => {
    el.classList.remove('open');
    const a = el.querySelector('.faq-answer');
    if (a) a.style.height = '0';
  });

  if (!isOpen) {
    item.classList.add('open');
    const inner = ans.querySelector('.faq-answer-inner');
    ans.style.height = (inner?.scrollHeight || 0) + 'px';
  }
}

// ============================================================
//  NEWS FEED (Blogger RSS)
// ============================================================
const BLOGGER_FEED_URL = 'https://webzoneonlineservicecenter.blogspot.com/feeds/posts/default?alt=json&max-results=6';

async function fetchNews() {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;

  // 1. Check for Local Management News (from Admin Portal)
  const localNews = localStorage.getItem('wz_news_list');
  if (localNews) {
    const newsArr = JSON.parse(localNews);
    if (newsArr.length > 0) {
      grid.innerHTML = newsArr.slice(0, 6).map(n => {
        const imgHtml = n.img 
          ? `<div class="news-img-wrap"><img src="${n.img}" class="news-img" alt="${n.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <div class="news-img-placeholder" style="display:none;">📰</div></div>`
          : `<div class="news-img-wrap"><div class="news-img-placeholder">📰</div></div>`;
          
        return `
          <div class="news-card">
            ${imgHtml}
            <div class="news-body">
              <div class="news-date">${n.date}</div>
              <h3 class="news-title">${n.title}</h3>
              <div class="news-excerpt">${n.desc}</div>
              <a href="${n.link || '#'}" target="_blank" rel="noopener" class="news-link">${t('news_read')}</a>
            </div>
          </div>
        `;
      }).join('');
      return;
    }
  }

  // Fallback news data (shown when Blogger feed is unavailable)
  const fallbackNews = [
    {
      title: 'Official Passport Verification Assistance — Same Week Processing',
      date: 'April 10, 2025',
      excerpt: 'Need urgent passport? Our professional assistance gets your application submitted correctly within 24 hours.',
      link: 'https://wa.me/919048532576?text=Hello%2C%20I%20need%20Passport%20help',
      emoji: '🛂'
    },
    {
      title: 'PAN Card Corrections — Fast & Easy Process',
      date: 'April 5, 2025',
      excerpt: 'Error in your PAN card? We help you correct names, dates, and addresses with minimal paperwork.',
      link: 'https://wa.me/919048532576?text=Hello%2C%20I%20need%20PAN%20card%20correction',
      emoji: '📋'
    },
    {
      title: 'Register for Central/State Scholarships Today',
      date: 'March 28, 2025',
      excerpt: 'National and State scholarship applications are open. We help students with the entire digital process.',
      link: 'https://wa.me/919048532576?text=Hello%2C%20I%20need%20Scholarship%20help',
      emoji: '🎓'
    },
    {
      title: 'KSEB Electricity Bill Payment — Secure & Instant',
      date: 'March 20, 2025',
      excerpt: 'Skip the long queues at the office. Pay all your utility bills online instantly through our gateway.',
      link: 'https://wa.me/919048532576?text=Hello%2C%20I%20need%20bill%20payment%20help',
      emoji: '⚡'
    },
    {
      title: 'New: Voter ID Enrollment & Correction Active',
      date: 'March 15, 2025',
      excerpt: 'Apply for a new Voter ID or update details on your existing card. Quick assistance via WhatsApp.',
      link: 'https://wa.me/919048532576?text=Hello%2C%20I%20need%20Voter%20ID%20help',
      emoji: '🆕'
    },
    {
      title: 'Life Certificate (Jeevan Pramaan) Assistance',
      date: 'March 12, 2025',
      excerpt: 'Pensioners can now submit Life Certificates digitally. We provide full setup and submission support.',
      link: 'https://wa.me/919048532576?text=Hello%2C%20I%20need%20Life%20Certificate%20help',
      emoji: '🔒'
    }
  ];

  try {
    const response = await fetch(BLOGGER_FEED_URL, { signal: AbortSignal.timeout(6000) });
    if (!response.ok) throw new Error('Feed unavailable');
    
    const data = await response.json();
    const entries = data.feed?.entry || [];
    
    if (entries.length === 0) throw new Error('No entries');

    grid.innerHTML = entries.slice(0, 6).map(entry => {
      const title = entry.title?.$t || 'Article';
      const link = entry.link?.find(l => l.rel === 'alternate')?.href || '#';
      const date = new Date(entry.published?.$t || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
      const summary = entry.summary?.$t?.replace(/<[^>]+>/g, '').substring(0, 120) + '...' || '';
      
      const thumb = entry?.['media$thumbnail']?.url || null;
      const imgHtml = thumb
        ? `<img src="${thumb}" class="news-img" alt="${title}" loading="lazy" onerror="this.parentNode.innerHTML='<div class=news-img-placeholder>📰</div>'">`
        : `<div class="news-img-placeholder">📰</div>`;

      return `
        <div class="news-card">
          ${imgHtml}
          <div class="news-body">
            <div class="news-date">${date}</div>
            <h3 class="news-title">${title}</h3>
            <p class="news-excerpt">${summary}</p>
            <a href="${link}" target="_blank" rel="noopener" class="news-link">${t('news_read')}</a>
          </div>
        </div>
      `;
    }).join('');

  } catch (err) {
    grid.innerHTML = fallbackNews.map(n => `
      <div class="news-card">
        <div class="news-img-placeholder">${n.emoji}</div>
        <div class="news-body">
          <div class="news-date">${n.date}</div>
          <h3 class="news-title">${n.title}</h3>
          <p class="news-excerpt">${n.excerpt}</p>
          <a href="${n.link}" target="_blank" rel="noopener" class="news-link">Read More →</a>
        </div>
      </div>
    `).join('');
  }
}

// ============================================================
//  CONTACT FORM → WHATSAPP
// ============================================================
function initContactForm() {
  const form = document.getElementById('contactWaForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf_name')?.value.trim() || '';
    const phone = document.getElementById('cf_phone')?.value.trim() || '';
    const service = document.getElementById('cf_service')?.value || '';
    const msg = document.getElementById('cf_msg')?.value.trim() || '';

    if (!name || !phone) return alert('Please fill in your name and phone number.');

    const waMsg = [
      `Hello Webzone! 👋`,
      ``,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Service:* ${service || 'General Inquiry'}`,
      ``,
      `*Message:*`,
      msg || 'I need your assistance.',
      ``,
      `Thank you!`
    ].join('\n');

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;
    window.open(url, '_blank');
  });
}

function populateServiceSelect() {
  const sel = document.getElementById('cf_service');
  if (!sel) return;

  const ph = t('form_srv_ph');
  sel.innerHTML = `<option value="">${ph}</option>` +
    services.map(s => {
      const title = s.title[currentLang] || s.title.en;
      return `<option value="${title}">${title}</option>`;
    }).join('');
}

// ============================================================
//  SMART SEARCH
// ============================================================
function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const box = document.getElementById('searchBox');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');

  // Section search
  const srvInput = document.getElementById('srvSearchInput');

  toggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    box?.classList.toggle('open');
    if (box?.classList.contains('open')) input?.focus();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) {
      box?.classList.remove('open');
    }
  });

  // Navbar search
  input?.addEventListener('input', () => {
    const val = input.value.toLowerCase().trim();
    if (val.length < 2) { results.innerHTML = ''; return; }

    const matches = services.filter(s => {
      const title = (s.title[currentLang] || s.title.en).toLowerCase();
      const desc = (s.desc[currentLang] || s.desc.en).toLowerCase();
      return title.includes(val) || desc.includes(val);
    });

    results.innerHTML = matches.length
      ? matches.map(s => `
          <div class="search-result-item" onclick="scrollToServices('${s.cat}'); box?.classList.remove('open');">
            <i class="${s.icon}"></i>
            <span>${s.title[currentLang] || s.title.en}</span>
          </div>
        `).join('')
      : `<div style="padding:12px;font-size:13px;color:var(--text-muted);">No results found</div>`;
  });

  // Services section search
  srvInput?.addEventListener('input', () => {
    const val = srvInput.value.toLowerCase().trim();
    if (!val) { renderServices(currentCat); return; }

    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    const matches = services.filter(s => {
      const title = (s.title[currentLang] || s.title.en).toLowerCase();
      const desc = (s.desc[currentLang] || s.desc.en).toLowerCase();
      return title.includes(val) || desc.includes(val);
    });

    if (matches.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">No services found for "${srvInput.value}"</div>`;
    } else {
      grid.innerHTML = matches.map(s => buildServiceCard(s)).join('');
    }
  });
}

function scrollToServices(cat) {
  allServicesVisible = false;
  renderServices(cat);
  const el = document.getElementById('services');
  if (el) {
    const navH = document.getElementById('mainNav')?.offsetHeight || 70;
    const top = el.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }
  document.getElementById('searchBox')?.classList.remove('open');
}

function filterServiceAndScroll(cat) {
  scrollToServices(cat);
}

// ============================================================
//  STATS COUNTER ANIMATION
// ============================================================
function initStatCounter() {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1800;
  const start = Date.now();

  function update() {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ============================================================
//  SCROLL ANIMATIONS (Fade In Up)
// ============================================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // If it's a staggered container, reveal children too if they have data-reveal
        if (entry.target.classList.contains('reveal-stagger')) {
            entry.target.querySelectorAll('[data-reveal]').forEach(child => child.classList.add('revealed'));
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Auto-tag elements for reveal if not already tagged
  const autoReveal = document.querySelectorAll('.srv-card, .news-card, .step-card, .stat-item, .contact-card, .faq-item, .about-text-col, .section-header');
  autoReveal.forEach((el, i) => {
      if (!el.hasAttribute('data-reveal')) {
          el.setAttribute('data-reveal', 'fade-up');
      }
      observer.observe(el);
  });

  // Observe tagged elements
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

// ============================================================
//  ANALYTICS TRACKER
// ============================================================
function trackEvent(type, value) {
    const stats = JSON.parse(localStorage.getItem('wz_stats') || '{"views":0, "clicks":0, "services":{}, "langs":{}}');
    
    if (type === 'view') stats.views++;
    if (type === 'click') stats.clicks++;
    if (type === 'service') {
        stats.services[value] = (stats.services[value] || 0) + 1;
        stats.clicks++;
    }
    if (type === 'lang') {
        stats.langs[value] = (stats.langs[value] || 0) + 1;
    }
    
    localStorage.setItem('wz_stats', JSON.stringify(stats));
}

// Initial view track
trackEvent('view');

// Handle WA clicks
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-whatsapp-nav, .btn-hero-wa, .float-wa, .wa-modal-btn, .contact-action-btn.wa-btn, .wa-submit-btn');
    if (btn) trackEvent('click');
});

