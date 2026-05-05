/* ============================================================
   Oak Hill Advisors — Team page interactions
   Renders the team grid, handles search + filter + bio modal.
   ============================================================ */

(() => {
  'use strict';

  if (typeof TEAM === 'undefined' || !Array.isArray(TEAM)) return;

  const grid = document.getElementById('teamGrid');
  const empty = document.getElementById('teamEmpty');
  const search = document.getElementById('teamSearch');
  const searchClear = document.getElementById('teamSearchClear');
  const count = document.getElementById('teamCount');
  const chips = document.querySelectorAll('.team-chip');
  if (!grid) return;

  const state = {
    query: '',
    office: 'all',
    focus: 'all',
  };

  /* -------- Render the grid once -------- */
  const initials = (name) => name.split(/\s+/).filter(Boolean).map(p => p[0]).join('').slice(0, 2).toUpperCase();

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const render = () => {
    const html = TEAM.map((m, i) => {
      const photo = m.photo
        ? `<img src="${m.photo}" alt="" loading="lazy" onerror="this.style.display='none'"/>`
        : '';
      return `
        <button class="team-member" type="button" data-index="${i}"
                data-name="${m.name.toLowerCase()}"
                data-role="${(m.title || '').toLowerCase()}"
                data-office="${m.office || ''}"
                data-focus="${(m.focus || []).join(',')}"
                data-search="${[m.name, m.title, m.office, (m.focus || []).join(' '), m.bio].join(' ').toLowerCase()}">
          <span class="team-member-photo">
            ${photo}
            <span class="initials">${initials(m.name)}</span>
            <span class="team-member-office">${m.office || ''}</span>
          </span>
          <h4>${m.name}</h4>
          <span class="role">${m.title || ''}</span>
        </button>
      `;
    }).join('');
    grid.innerHTML = html;
  };

  /* -------- Apply search + filters -------- */
  const apply = () => {
    const members = grid.querySelectorAll('.team-member');
    const q = state.query.trim().toLowerCase();
    let shown = 0;

    members.forEach(el => {
      const matchSearch = !q || el.dataset.search.includes(q);
      const matchOffice = state.office === 'all' || el.dataset.office === state.office;
      const matchFocus = state.focus === 'all' || el.dataset.focus.split(',').includes(state.focus);
      const visible = matchSearch && matchOffice && matchFocus;
      el.classList.toggle('is-hidden', !visible);
      if (visible) shown++;
    });

    count.innerHTML = `Showing <strong>${shown}</strong> of <strong>${TEAM.length}</strong> professional${TEAM.length === 1 ? '' : 's'}`;
    empty.classList.toggle('is-visible', shown === 0);
    searchClear.classList.toggle('is-visible', q.length > 0);
  };

  /* -------- Search -------- */
  if (search) {
    search.addEventListener('input', (e) => {
      state.query = e.target.value;
      apply();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      state.query = '';
      search.value = '';
      search.focus();
      apply();
    });
  }

  /* -------- Filter chips -------- */
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      const value = chip.dataset.value;
      // Deactivate siblings within the same filter group
      document.querySelectorAll(`.team-chip[data-filter="${filter}"]`).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state[filter] = value;
      apply();
    });
  });

  /* -------- Bio modal -------- */
  const modal = document.getElementById('bioModal');
  const modalClose = document.getElementById('bioModalClose');
  const modalName = document.getElementById('bioModalName');
  const modalRole = document.getElementById('bioModalRole');
  const modalEyebrow = document.getElementById('bioModalEyebrow');
  const modalInitials = document.getElementById('bioModalInitials');
  const modalPhoto = document.getElementById('bioModalPhoto');
  const modalMeta = document.getElementById('bioModalMeta');
  const modalBio = document.getElementById('bioModalBio');
  const modalEducationSection = document.getElementById('bioModalEducationSection');
  const modalEducation = document.getElementById('bioModalEducation');
  const modalPriorSection = document.getElementById('bioModalPriorSection');
  const modalPrior = document.getElementById('bioModalPrior');

  const escapeHtml = (s) => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const paragraphs = (text) =>
    text.split(/\n\s*\n/).map(p => `<p>${escapeHtml(p.trim()).replace(/\n/g, '<br/>')}</p>`).join('');

  const openBio = (member) => {
    modalName.textContent = member.name;
    modalRole.textContent = member.title || '';
    modalEyebrow.textContent = (member.focus && member.focus[0]) || 'Investment Team';
    modalInitials.textContent = initials(member.name);

    // Photo
    modalPhoto.querySelectorAll('img').forEach(n => n.remove());
    if (member.photo) {
      const img = document.createElement('img');
      img.src = member.photo;
      img.alt = '';
      img.onerror = () => img.remove();
      modalPhoto.insertBefore(img, modalInitials);
    }

    // Meta (office, joined, focus chips)
    const metaItems = [];
    if (member.office) metaItems.push({ label: 'Office', value: member.office });
    if (member.joined) metaItems.push({ label: 'Joined OHA', value: member.joined });
    if (member.focus && member.focus.length) metaItems.push({ label: 'Focus', value: member.focus.join(' · ') });
    modalMeta.innerHTML = metaItems.map(it => `
      <div>
        <dt>${it.label}</dt>
        <dd>${escapeHtml(it.value)}</dd>
      </div>
    `).join('');

    // Bio
    modalBio.innerHTML = member.bio ? paragraphs(member.bio) : '';

    // Education
    if (member.education && member.education.length) {
      modalEducation.innerHTML = member.education.map(e => `<li>${escapeHtml(e)}</li>`).join('');
      modalEducationSection.hidden = false;
    } else {
      modalEducationSection.hidden = true;
    }

    // Prior experience
    if (member.prior && member.prior.length) {
      modalPrior.innerHTML = member.prior.map(e => `<li>${escapeHtml(e)}</li>`).join('');
      modalPriorSection.hidden = false;
    } else {
      modalPriorSection.hidden = true;
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('has-modal');

    // Update URL hash for shareability
    history.replaceState(null, '', `#${slug(member.name)}`);
  };

  const closeBio = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('has-modal');
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  };

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.team-member');
    if (!btn) return;
    const member = TEAM[parseInt(btn.dataset.index, 10)];
    if (member) openBio(member);
  });

  modalClose.addEventListener('click', closeBio);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeBio(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeBio();
  });

  /* -------- Initial render -------- */
  render();
  apply();

  // Deep-link: open modal if URL hash matches a slugged name
  if (location.hash.length > 1) {
    const target = decodeURIComponent(location.hash.slice(1));
    const match = TEAM.find(m => slug(m.name) === target);
    if (match) openBio(match);
  }
})();
