/* ============================================================
   Oak Hill Advisors — v2 Interactions
   ============================================================ */

(() => {
  'use strict';

  /* ---------- Sticky header ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('is-open');
      links.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        links.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Animated number counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);

        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const v = target * easeOut(t);
          el.textContent = prefix + v.toFixed(decimals) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cio.observe(c));
  }

  /* ---------- Market pulse ticker ---------- */
  const pulseTrack = document.getElementById('pulseTrack');
  if (pulseTrack) {
    const items = [
      { lbl: 'US HY Index', val: '7.84%', delta: '+0.06', up: false },
      { lbl: 'BB Spread', val: '178bps', delta: '−4', up: true },
      { lbl: 'B Spread', val: '352bps', delta: '−7', up: true },
      { lbl: 'CCC Spread', val: '742bps', delta: '+12', up: false },
      { lbl: 'EUR HY', val: '6.12%', delta: '−0.02', up: true },
      { lbl: 'LSTA Loan Idx', val: '96.42', delta: '+0.18', up: true },
      { lbl: 'CLO BB OAS', val: '512bps', delta: '−6', up: true },
      { lbl: 'US 10Y', val: '4.18%', delta: '+0.02', up: false },
      { lbl: 'iTraxx XO', val: '286bps', delta: '−3', up: true },
      { lbl: 'CDX HY', val: '342bps', delta: '−5', up: true },
      { lbl: 'Default Rate (LTM)', val: '2.4%', delta: '−10bps', up: true },
    ];

    const renderItems = () => items.map(it => `
      <span class="pulse-item">
        <span class="dot"></span>
        <span class="lbl">${it.lbl}</span>
        <span class="val">${it.val}</span>
        <span class="${it.up ? 'delta-up' : 'delta-dn'}">${it.up ? '▲' : '▼'} ${it.delta}</span>
      </span>
    `).join('');

    // Render twice for seamless infinite scroll
    pulseTrack.innerHTML = renderItems() + renderItems();
  }

  /* ---------- Interactive office map ---------- */
  const map = document.getElementById('worldMap');
  const tooltip = document.getElementById('officeTooltip');
  if (map && tooltip) {
    const pins = map.querySelectorAll('.office-pin');
    const rows = document.querySelectorAll('.office-row');

    const showTooltip = (pin) => {
      const rect = map.getBoundingClientRect();
      const pinRect = pin.getBoundingClientRect();
      const x = pinRect.left - rect.left + pinRect.width / 2;
      const y = pinRect.top - rect.top;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
      tooltip.querySelector('.city').textContent = pin.dataset.city;
      tooltip.querySelector('.role').innerHTML = pin.dataset.role;
      tooltip.classList.add('is-visible');
    };

    const hideTooltip = () => tooltip.classList.remove('is-visible');

    const setActive = (city) => {
      pins.forEach(p => p.classList.toggle('is-active', p.dataset.city === city));
      rows.forEach(r => r.classList.toggle('is-active', r.dataset.city === city));
    };

    pins.forEach(pin => {
      pin.addEventListener('mouseenter', () => { showTooltip(pin); setActive(pin.dataset.city); });
      pin.addEventListener('mouseleave', () => { hideTooltip(); setActive(null); });
      pin.addEventListener('focus', () => { showTooltip(pin); setActive(pin.dataset.city); });
      pin.addEventListener('blur', () => { hideTooltip(); setActive(null); });
      pin.setAttribute('tabindex', '0');
    });

    rows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        const matchingPin = [...pins].find(p => p.dataset.city === row.dataset.city);
        if (matchingPin) { showTooltip(matchingPin); setActive(row.dataset.city); }
      });
      row.addEventListener('mouseleave', () => { hideTooltip(); setActive(null); });
    });
  }

  /* ---------- Insights filters ---------- */
  const filterButtons = document.querySelectorAll('.filter-chip');
  const insightItems = document.querySelectorAll('[data-category]');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      insightItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Contact form (no-op) ---------- */
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.textContent = 'Message sent — thank you';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
          form.reset();
        }, 2400);
      }
    });
  }
})();
