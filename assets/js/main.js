(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const search = document.querySelector('#post-search');
  const posts = Array.from(document.querySelectorAll('[data-post]'));
  if (!search) return;
  const categories = Array.from(document.querySelectorAll('[data-category].filter-button'));
  const tags = Array.from(document.querySelectorAll('.tag-filter'));
  const status = document.querySelector('#search-status');
  const empty = document.querySelector('#no-results');
  const initial = new URLSearchParams(location.search);
  let selectedCategory = (initial.get('category') || '').toLowerCase();
  let selectedTag = (initial.get('tag') || '').toLowerCase();

  function syncFilterUrl() {
    const params = new URLSearchParams(location.search);
    if (selectedCategory) params.set('category', selectedCategory);
    else params.delete('category');
    if (selectedTag) params.set('tag', selectedTag);
    else params.delete('tag');
    const query = params.toString();
    history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}${location.hash}`);
  }

  function update() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    posts.forEach(post => {
      const postCategories = JSON.parse(post.dataset.categories || '[]').map(value => String(value).toLowerCase());
      const postTags = JSON.parse(post.dataset.tags || '[]').map(value => String(value).toLowerCase());
      const text = `${post.dataset.search || ''} ${postCategories.join(' ')} ${postTags.join(' ')}`;
      const categoryMatch = !selectedCategory || postCategories.includes(selectedCategory);
      const tagMatch = !selectedTag || postTags.includes(selectedTag);
      const show = (!query || text.includes(query)) && categoryMatch && tagMatch;
      post.hidden = !show;
      if (show) visible += 1;
    });
    categories.forEach(button => {
      const selected = button.dataset.category === selectedCategory;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    tags.forEach(button => button.classList.toggle('is-active', button.dataset.tag === selectedTag));
    if (status) status.textContent = (query || selectedCategory || selectedTag) ? `검색된 기록 ${visible}개${selectedTag ? ` · #${selectedTag}` : ''}` : '';
    if (empty) empty.hidden = visible !== 0 || posts.length === 0;
  }
  search.addEventListener('input', update);
  categories.forEach(button => button.addEventListener('click', () => {
    selectedCategory = button.dataset.category || '';
    selectedTag = '';
    syncFilterUrl();
    update();
    if (button.classList.contains('side-category')) document.querySelector('#stories')?.scrollIntoView({behavior: 'smooth'});
  }));
  tags.forEach(button => button.addEventListener('click', () => {
    selectedTag = selectedTag === button.dataset.tag ? '' : button.dataset.tag;
    selectedCategory = '';
    syncFilterUrl();
    update();
    document.querySelector('#stories')?.scrollIntoView({behavior: 'smooth'});
  }));
  update();
})();

(() => {
  document.querySelectorAll('[data-local-date]').forEach(node => {
    const date = new Date(node.dataset.localDate);
    if (Number.isNaN(date.getTime())) return;
    node.textContent = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul', year: 'numeric', month: 'long', day: 'numeric',
      weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false
    }).format(date);
  });
})();


(() => {
  const site = (document.body?.dataset.goatcounterSite || '').trim();
  const stats = document.querySelector('.visitor-stats');
  if (!stats) return;
  const values = {
    yesterday: stats.querySelector('[data-visit="yesterday"]'),
    today: stats.querySelector('[data-visit="today"]'),
    total: stats.querySelector('[data-visit="total"]')
  };
  const connect = stats.querySelector('.stats-connect-link');
  if (!site || !/^[A-Za-z0-9-]+$/.test(site)) {
    if (connect) connect.hidden = false;
    return;
  }
  if (connect) connect.hidden = true;
  const pad = n => String(n).padStart(2, '0');
  const localDate = offset => {
    const now = new Date();
    now.setDate(now.getDate() + offset);
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  };
  const endpoint = (start, end) => {
    const params = new URLSearchParams();
    if (start) params.set('start', start);
    if (end) params.set('end', end);
    return `https://${site}.goatcounter.com/counter/TOTAL.json${params.toString() ? `?${params}` : ''}`;
  };
  const read = async (node, start, end) => {
    if (!node) return;
    try {
      const response = await fetch(endpoint(start, end), { mode: 'cors', credentials: 'omit' });
      if (!response.ok) throw new Error('counter unavailable');
      const data = await response.json();
      node.textContent = data.count ?? '—';
    } catch (_) { node.textContent = '—'; }
  };
  const today = localDate(0);
  const yesterday = localDate(-1);
  read(values.total);
  read(values.today, today);
  read(values.yesterday, yesterday, yesterday);
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = `https://${site}.goatcounter.com/count`;
  document.head.appendChild(script);
})();
